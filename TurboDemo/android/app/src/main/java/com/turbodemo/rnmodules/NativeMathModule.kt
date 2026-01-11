package com.turbodemo.rnmodules


import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.turbodemo.NativeMathSpec

@ReactModule(name = NativeMathModule.NAME)
class NativeMathModule(
    reactContext: ReactApplicationContext
): NativeMathSpec(reactContext), TurboModule {

    override fun multiply(a: Double, b: Double): Double {
        return a * b
    }

    companion object {
        const val NAME = "NativeMath"
    }
}