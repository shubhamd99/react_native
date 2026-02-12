package com.analytics.rn_modules

import com.analytics.NativeAnalyticsSpec
import com.analytics.data.AnalyticsRepository
import com.analytics.model.AnalyticsEvent
import kotlinx.coroutines.*
import com.analytics.util.DeviceUtil
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.util.UUID

@ReactModule(name = AnalyticsModule.NAME)
class AnalyticsModule(
    reactContext: ReactApplicationContext,
    private val repository: AnalyticsRepository
) : NativeAnalyticsSpec(reactContext), TurboModule {

    private val deviceUtil = DeviceUtil(reactContext)
    private val gson = Gson()
    private val scope = CoroutineScope(Dispatchers.IO)

    override fun getName(): String {
        return NAME
    }

    override fun sendAnalyticsEvent(analyticsEvent: ReadableMap) {
        try {
            val event = mapToAnalyticsEvent(analyticsEvent)
            repository.addEvent(event)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun getQueueLength(promise: Promise) {
        scope.launch {
            try {
                val size = repository.getQueueSize()
                promise.resolve(size)
            } catch (e: Exception) {
                promise.reject("E_QUEUE_ERROR", e.message)
            }
        }
    }

    private fun mapToAnalyticsEvent(specEvent: ReadableMap): AnalyticsEvent {
        val objectValueMap = specEvent.getMap("objectValue")?.toHashMap() ?: emptyMap()

        return AnalyticsEvent(
            id = UUID.randomUUID().toString(),
            schemaVersion = specEvent.getString("schemaVersion") ?: "",
            objectName = specEvent.getString("objectName") ?: "",
            objectValue = objectValueMap,
            userId = specEvent.getString("userId") ?: "",
            screenName = specEvent.getString("screenName") ?: "",
            context = specEvent.getString("context") ?: "",
            deviceId = deviceUtil.deviceId,
            appVersion = deviceUtil.appVersion
        )
    }

    companion object {
        const val NAME = "NativeAnalytics"
    }
}

