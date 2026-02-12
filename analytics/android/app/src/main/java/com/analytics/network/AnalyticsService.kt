package com.analytics.network

import com.analytics.model.AnalyticsBatch
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AnalyticsService {
    @POST("api/v1/batch-analytics") // Updated endpoint
    suspend fun sendEvents(@Body batch: AnalyticsBatch): Response<Unit>
}
