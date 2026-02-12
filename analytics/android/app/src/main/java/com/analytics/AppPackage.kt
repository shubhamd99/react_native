package com.analytics

import com.analytics.data.AnalyticsRepository
import com.analytics.rn_modules.AnalyticsModule
import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.ModuleSpec
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class AppPackage(private val repository: AnalyticsRepository) : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            AnalyticsModule.NAME -> AnalyticsModule(reactContext, repository)
            else -> null
        }
    }

    override fun getViewManagers(reactContext: ReactApplicationContext): List<ModuleSpec> {
        return emptyList()
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            AnalyticsModule.NAME to ReactModuleInfo(
                AnalyticsModule.NAME,
                AnalyticsModule.NAME,
                false, // canOverrideExistingModule
                false, // needsEagerInit
                false, // cxx module
                true // turbo module
            )
        )

    }
}