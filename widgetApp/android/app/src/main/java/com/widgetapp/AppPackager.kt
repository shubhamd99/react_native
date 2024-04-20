package com.widgetapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.Collections


class AppPackager() : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules = ArrayList<NativeModule>()
        modules.add(SharedStorage(reactContext))
        return modules
    }

    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<* ,*>> {
        return Collections.emptyList()
    }
}