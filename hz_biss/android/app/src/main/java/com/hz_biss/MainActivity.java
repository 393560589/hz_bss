package com.hz_biss;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.*;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import java.lang.Override;

import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
        Log.i("MainActivity", "onCreate executed!");
    }

    @Override
    protected String getMainComponentName() {
        return "hz_biss";
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

}