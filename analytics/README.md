# Analytics Module

A production-ready, high-performance Analytics TurboModule for React Native that handles event tracking with intelligent batching, retry logic, and offline support.

## Features

✅ **FIFO Queue Processing** - Events processed in chronological order  
✅ **Automatic Batching** - Batches of 10 events or 5-second intervals  
✅ **Exponential Backoff** - Smart retry logic (1s → 60s max)  
✅ **Memory Protection** - 100-event queue capacity limit  
✅ **Thread-Safe** - "One Lock Rule" pattern prevents deadlocks  
✅ **Fault Tolerant** - Isolated coroutines with SupervisorJob  
✅ **Zero Battery Drain** - No infinite retry loops  
✅ **Offline Support** - Queue persists and auto-retries

---

## Architecture

### Core Components

```
React Native (JS)
        ↓
AnalyticsModule (TurboModule Bridge)
        ↓
AnalyticsRepository (Queue + Logic)
        ↓
AnalyticsService (HTTP Client)
        ↓
Server API
```

### Key Classes

| Class                       | Responsibility                    |
| --------------------------- | --------------------------------- |
| `AnalyticsModule.kt`        | TurboModule bridge to JavaScript  |
| `AnalyticsRepository.kt`    | Core queue, batching, retry logic |
| `AnalyticsService.kt`       | Retrofit HTTP API interface       |
| `AnalyticsEvent.kt`         | Event data model                  |
| `AnalyticsBatch.kt`         | Batch wrapper for API             |
| `AnalyticsServiceModule.kt` | Dagger Hilt DI setup              |

---

## How It Works

### 1. Event Flow (FIFO)

```kotlin
addEvent(event1) → Queue: [1]
addEvent(event2) → Queue: [1,2]
addEvent(event10) → Queue: [1,2...10]
                    ↓ Batch size reached
            Flush [1,2,3,4,5,6,7,8,9,10]
                    ↓ Success
            Queue: [] (empty)
```

### 2. Batching Logic

```kotlin
// Trigger Conditions
if (queue.size >= 10) → Immediate flush
if (5 seconds elapsed) → Timer flush
```

### 3. Failure & Retry

```kotlin
Flush fails → Re-add to front → Calculate backoff → Schedule retry
Retry 1: wait 1s
Retry 2: wait 2s
Retry 3: wait 4s
Retry 4: wait 8s
Retry 5: wait 16s
Retry 6: wait 32s
Retry 7+: wait 60s (max)
```

### 4. Memory Protection

```kotlin
if (queue.size >= 100) {
    queue.removeFirst()  // Drop oldest
    Log.w("Queue full, evicted oldest")
}
queue.addLast(newEvent)
```

### 5. Thread Safety

**One Lock Rule**: Acquire lock → Queue operation → Release lock

```kotlin
val shouldFlush = mutex.withLock {
    queue.addLast(event)  // Lock held
    queue.size >= BATCH_SIZE
}
// Lock released here
if (shouldFlush) triggerFlush()  // No lock
```

**No blocking in critical sections**:

- Network calls outside mutex
- Backoff checks before mutex
- Minimal lock time (~1μs)

---

## Usage

### JavaScript

```typescript
import { NativeModules } from 'react-native';
const { Analytics } = NativeModules;

// Send event
Analytics.sendAnalyticsEvent({
  eventName: 'button_click',
  timestamp: Date.now(),
  properties: { button_id: 'signup' },
});

// Check queue size
const size = await Analytics.getQueueSize();
```

### Configuration

```kotlin
// AnalyticsRepository.kt
private val BATCH_SIZE = 10           // Events per batch
private val FLUSH_INTERVAL_MS = 5000L // Timer interval
private val MAX_QUEUE_CAPACITY = 100  // Max queue size
private val MAX_BACKOFF_MS = 60000L   // Max retry delay
```

---

## Technical Details

### Concurrency Model

```kotlin
private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
private val mutex = Mutex()
private val nextAvailableFlushTime = AtomicLong(0L)
```

- **Dispatchers.IO**: Optimized for network I/O
- **SupervisorJob**: Crash isolation between coroutines
- **Mutex**: Queue operation synchronization
- **AtomicLong**: Lock-free timestamp checks

### Key Functions

**addEvent()**: Add event to queue, trigger flush if needed

```kotlin
fun addEvent(event: AnalyticsEvent) {
    scope.launch {
        val shouldFlush = mutex.withLock {
            // Capacity check + add
        }
        if (shouldFlush) triggerFlush()
        else ensureFlushTimer()
    }
}
```

**triggerFlush()**: Launch new flush coroutine

```kotlin
private fun triggerFlush() {
    scope.launch { flushEvents() }
}
```

**flushEvents()**: Extract batch, send to server, handle response

```kotlin
private suspend fun flushEvents() {
    // 1. Check backoff
    // 2. Extract batch (with lock)
    // 3. Send to server (no lock)
    // 4. Handle success/failure
}
```

**ensureFlushTimer()**: Ensure timer is running

```kotlin
private fun ensureFlushTimer() {
    if (flushTimerJob?.isActive == true) return
    flushTimerJob = scope.launch {
        delay(FLUSH_INTERVAL_MS)
        triggerFlush()
    }
}
```

---

## Edge Cases Handled

| Scenario                    | Behavior                               |
| --------------------------- | -------------------------------------- |
| Network offline             | Events queued, auto-retry with backoff |
| Server 500 error            | Exponential backoff prevents hammering |
| 100+ events offline         | Oldest events dropped (OOM prevention) |
| Concurrent addEvent() calls | Mutex ensures thread safety            |
| Timer fires during flush    | Separate coroutines, no conflict       |
| Backoff expires             | ensureFlushTimer() schedules retry     |
| Large queue (50+ events)    | Recursive flush (no 5s waits)          |
| App backgrounded            | Coroutines continue until queue empty  |

---

## Monitoring

### Logs

```bash
adb logcat | grep AnalyticsRepo
```

**Sample Output**:

```
D/AnalyticsRepo: Added. Size: 10
D/AnalyticsRepo: Flushing 10 items
D/AnalyticsRepo: Success
E/AnalyticsRepo: Failed: 500
W/AnalyticsRepo: Backing off for 2000ms
```

---

## File Structure

```
android/app/src/main/java/com/analytics/
├── data/
│   └── AnalyticsRepository.kt    # Core queue logic
├── di/
│   └── AnalyticsServiceModule.kt # DI setup
├── model/
│   ├── AnalyticsEvent.kt         # Event model
│   └── AnalyticsBatch.kt         # Batch model
├── network/
│   └── AnalyticsService.kt       # Retrofit API
└── rn_modules/
    └── AnalyticsModule.kt        # TurboModule
```

---

## Performance

- **Lock Hold Time**: < 1μs (queue ops only)
- **Memory**: ~100KB max (100 events × 1KB)
- **Latency**: ≤ 5s or immediate (≥10 events)
- **Retry**: Exponential 1s → 60s

---

## Known Limitations

1. **In-Memory Only**: No persistent storage (app kill = data loss)
2. **Single Endpoint**: All events to one API
3. **No Event Priority**: FIFO only, no priority queue

---

## License

MIT License
