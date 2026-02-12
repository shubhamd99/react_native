package com.analytics.model

import com.google.gson.annotations.SerializedName

data class AnalyticsEvent(
    @SerializedName("id") val id: String,
    @SerializedName("schemaVersion") val schemaVersion: String,
    @SerializedName("objectName") val objectName: String,
    @SerializedName("objectValue") val objectValue: Any?, // Use Any? or specific map if Gson handles it
    @SerializedName("userId") val userId: String,
    @SerializedName("screenName") val screenName: String,
    @SerializedName("context") val context: String,
    @SerializedName("deviceId") val deviceId: String,
    @SerializedName("appVersion") val appVersion: String,
    @SerializedName("timestamp") val timestamp: Long = System.currentTimeMillis()
)

data class AnalyticsBatch(
    @SerializedName("events") val events: List<AnalyticsEvent>
)
