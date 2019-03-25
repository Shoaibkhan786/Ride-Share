package com.rideshare.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.toasty.RNToastyPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
 import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // <-- Add this line




import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNToastyPackage(),
            new RNFirebasePackage(), 
            new ImagePickerPackage(),
            //new RNCameraPackage(),
            new RNFirebaseAuthPackage(), 
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage(),
            new VectorIconsPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseCrashlyticsPackage()
            
            
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
