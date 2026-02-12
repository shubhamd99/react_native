package com.analytics.data

import android.util.Log
import com.analytics.model.AnalyticsBatch
import com.analytics.model.AnalyticsEvent
import com.analytics.network.AnalyticsService
import kotlinx.coroutines.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import javax.inject.Inject
import javax.inject.Singleton
import java.util.ArrayDeque
import java.util.concurrent.atomic.AtomicLong
import kotlin.math.min

@Singleton
class AnalyticsRepository @Inject constructor(
    private val analyticsService: AnalyticsService
) {
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
    private val queue = ArrayDeque<AnalyticsEvent>()
    private val mutex = Mutex()
    
    // Rename to explicitly indicate this controls the DELAY, not the WORK
    private var flushTimerJob: Job? = null
    
    private val BATCH_SIZE = 10
    private val FLUSH_INTERVAL_MS = 5000L
    private val MAX_QUEUE_CAPACITY = 100
    private val MAX_BACKOFF_MS = 60000L
    private val INITIAL_BACKOFF_MS = 1000L
    
    private var retryCount = 0
    // AtomicLong allows checking timestamp safely without locking mutex
    private val nextAvailableFlushTime = AtomicLong(0L)

    suspend fun getQueueSize(): Int = mutex.withLock { queue.size }

    fun addEvent(event: AnalyticsEvent) {
        scope.launch {
            val shouldFlush = mutex.withLock {
                if (queue.size >= MAX_QUEUE_CAPACITY) {
                    queue.removeFirst()
                    Log.w("AnalyticsRepo", "Queue full, evicted oldest")
                }
                queue.addLast(event)
                Log.d("AnalyticsRepo", "Added. Size: ${queue.size}")
                
                queue.size >= BATCH_SIZE
            }
            
            // Logic regarding flushing happens safely outside the lock
            if (shouldFlush) {
                // Cancel any pending timer since we are flushing NOW
                flushTimerJob?.cancel()
                triggerFlush()
            } else {
                ensureFlushTimer()
            }
        }
    }

    private fun ensureFlushTimer() {
        if (flushTimerJob?.isActive == true) return
        
        flushTimerJob = scope.launch {
            delay(FLUSH_INTERVAL_MS)
            triggerFlush()
        }
    }

    private fun triggerFlush() {
        // Launch a NEW coroutine for the work.
        // This avoids the "Suicide Bug" where the timer cancels itself.
        scope.launch {
            flushEvents()
        }
    }

    private suspend fun flushEvents() {
        // 1. Check Backoff
        val currentTime = System.currentTimeMillis()
        val nextTime = nextAvailableFlushTime.get()
        
        if (currentTime < nextTime) {
            val waitMs = nextTime - currentTime
            Log.d("AnalyticsRepo", "Backoff active. Waiting ${waitMs}ms")
            
            // FIX: "Silent Death" bug. 
            // If we can't flush now, we MUST schedule the timer to try again later.
            ensureFlushTimer()
            return
        }

        // 2. Extract Batch
        val batchEvents = mutex.withLock {
            if (queue.isEmpty()) return@withLock emptyList()
            
            val batch = mutableListOf<AnalyticsEvent>()
            while (batch.size < BATCH_SIZE && queue.isNotEmpty()) {
                batch.add(queue.removeFirst())
            }
            batch
        }

        if (batchEvents.isEmpty()) return

        Log.d("AnalyticsRepo", "Flushing ${batchEvents.size} items")

        try {
            val response = analyticsService.sendEvents(AnalyticsBatch(batchEvents))
            
            if (response.isSuccessful) {
                Log.d("AnalyticsRepo", "Success")
                resetBackoff()
                // Check if more items remain (Recursive flush)
                mutex.withLock { 
                    if (queue.isNotEmpty()) triggerFlush() 
                }
            } else {
                Log.e("AnalyticsRepo", "Failed: ${response.code()}")
                handleFailure(batchEvents)
            }
        } catch (e: Exception) {
            Log.e("AnalyticsRepo", "Exception", e)
            handleFailure(batchEvents)
        }
    }

    private suspend fun handleFailure(events: List<AnalyticsEvent>) {
        mutex.withLock {
            // Re-add to front (FIFO preservation)
            events.asReversed().forEach { queue.addFirst(it) }
            
            retryCount++
            val exponentialDelay = (1 shl min(retryCount, 20)) * INITIAL_BACKOFF_MS
            val delayMs = min(exponentialDelay, MAX_BACKOFF_MS)
            
            nextAvailableFlushTime.set(System.currentTimeMillis() + delayMs)
            Log.w("AnalyticsRepo", "Backing off for ${delayMs}ms")
            
            // Ensure the timer runs so we retry after the backoff expires
            ensureFlushTimer()
        }
    }

    private fun resetBackoff() {
        retryCount = 0
        nextAvailableFlushTime.set(0L)
    }
}
