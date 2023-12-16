package com.stantechai

import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryStatusModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryStatusModule"
    }

    @ReactMethod
    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    fun isBatterySaverModeEnabled(): Boolean {
        val powerManager = reactContext.getSystemService(Context.POWER_SERVICE) as android.os.PowerManager
        return powerManager.isPowerSaveMode
    }
}
