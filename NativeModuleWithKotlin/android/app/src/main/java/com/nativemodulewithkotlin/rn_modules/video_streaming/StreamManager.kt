package com.nativemodulewithkotlin.rn_modules.video_streaming

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class StreamManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KotlinVideoStream"
    }

    @ReactMethod
    fun playVideoStream(videoTitle: String, videoUrl: String) {
        val intent = Intent(reactApplicationContext, VideoStreamingActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK // Calling startActivity() from outside of an Activity context
        intent.putExtra("videoTitle", videoTitle)
        intent.putExtra("videoUrl", videoUrl)
        reactApplicationContext.startActivity(intent)
    }

}