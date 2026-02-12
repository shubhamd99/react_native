package com.analytics.util

import android.content.Context
import android.provider.Settings

class DeviceUtil(private val context: Context) {

    val deviceId: String 
        get() = cachedDeviceId ?: fetchDeviceId().also { cachedDeviceId = it }

    val appVersion: String 
        get() = cachedAppVersion ?: fetchAppVersion().also { cachedAppVersion = it }

    private fun fetchDeviceId(): String {
        return try {
            Settings.Secure.getString(
                context.contentResolver,
                Settings.Secure.ANDROID_ID
            ) ?: "unknown_device"
        } catch (e: Exception) {
            "unknown_device"
        }
    }

    private fun fetchAppVersion(): String {
        return try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            packageInfo.versionName ?: "1.0"
        } catch (e: Exception) {
            "1.0"
        }
    }

    companion object {
        private var cachedDeviceId: String? = null
        private var cachedAppVersion: String? = null
    }
}
