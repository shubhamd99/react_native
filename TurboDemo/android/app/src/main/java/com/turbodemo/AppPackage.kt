package com.turbodemo

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.ModuleSpec
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.turbodemo.rnmodules.NativeMathModule

class AppPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            NativeMathModule.NAME -> NativeMathModule(reactContext)
            else -> null
        }
    }

    override fun getViewManagers(reactContext: ReactApplicationContext): List<ModuleSpec> {
        return emptyList()
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            NativeMathModule.NAME to ReactModuleInfo(
                NativeMathModule.NAME,
                NativeMathModule.NAME,
                false, // canOverrideExistingModule
                false, // needsEagerInit
                false, // cxx module
                true // turbo module
            )
        )

    }
}