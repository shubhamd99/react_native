# React Native 0.83 TurboModule (New Architecture) – Complete Guide

This project shows how to create a **TurboModule** (the replacement of the old Bridge NativeModule) in **React Native 0.83+** using the **New Architecture**.

We will expose a native method:

multiply(a, b)

and call it directly from JavaScript using JSI.

---

## ✅ Prerequisites

- Node.js 20+
- React Native 0.83.x
- Android Studio / Xcode installed
- New Architecture (enabled by default in RN 0.83)

Check:

node -v

---

## 🏗️ Step 1 — Create Project

npx @react-native-community/cli init TurboDemo --version 0.83.1  
cd TurboDemo

Test run:

npx react-native run-android

---

## 📁 Step 2 — Folder Structure

We keep TurboModule specs in `src/`:

TurboDemo/  
 src/  
 NativeMath.ts  
 App.tsx

---

## 🧾 Step 3 — Create TurboModule Spec (JS/TS)

Create file:

src/NativeMath.ts

```ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeMath');
```

## ⚙️ Step 4 — Configure Codegen

Open:

package.json

Add:

```js
"codegenConfig": {
    "name": "TurboDemoSpec",
    "type": "modules",
    "jsSrcsDir": "src",
    "android": {
        "javaPackageName": "com.turbodemo"
    }
}
```

Make sure:

- jsSrcsDir points to the folder containing NativeMath.ts
- javaPackageName matches your Android package

## 🔁 Step 5 — Run Codegen

cd android
./gradlew generateCodegenArtifactsFromSchema
cd ..

Verify file exists:

android/app/build/generated/source/codegen/java/com/turbodemo/NativeMathSpec.java

## 🤖 Step 6 — Implement Android TurboModule

Create file:

android/app/src/main/java/com/turbodemo/NativeMathModule.kt

```kotlin
package com.turbodemo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule

@ReactModule(name = NativeMathModule.NAME)
class NativeMathModule(
  reactContext: ReactApplicationContext
) : NativeMathSpec(reactContext), TurboModule {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = "NativeMath"
  }
}
```

## 📦 Step 7 — Create TurboPackage

Create file:

android/app/src/main/java/com/turbodemo/MyTurboPackage.kt

```kotlin
package com.turbodemo

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class MyTurboPackage : TurboReactPackage() {

  override fun getModule(name: String, context: ReactApplicationContext): NativeModule? {
    if (name == NativeMathModule.NAME) {
      return NativeMathModule(context)
    }
    return null
  }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativeMathModule.NAME to ReactModuleInfo(
        NativeMathModule.NAME,
        NativeMathModule.NAME,
        false,
        false,
        true,
        false
      )
    )
  }
}

```

## 🏗️ Step 8 — Register Package

Open:

android/app/src/main/java/com/turbodemo/MainApplication.kt

Find:

override fun getPackages(): List<ReactPackage> {

Add:

packages.add(MyTurboPackage())

## ⚛️ Step 9 — Use TurboModule from JS

Edit:

src/App.tsx

```ts
import React from 'react';
import { View, Text } from 'react-native';
import NativeMath from './NativeMath';

export default function App() {
  const result = NativeMath.multiply(6, 7);

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Result from Native: {result}</Text>
    </View>
  );
}
```

## ▶️ Step 10 — Clean & Run

cd android
./gradlew clean
cd ..
npx react-native run-android

You should see:

Result from Native: 42

## 🧠 What You Built

TurboModule (New Architecture)

JSI-based native call

Synchronous native method

No bridge, no JSON serialization

Type-safe via Codegen

## 🪟 Windows Requirements (IMPORTANT)

If you are building this project on Windows, you MUST install:

✅ Visual Studio 2022 Build Tools

React Native Android (NDK + CMake + Ninja) requires the Windows C++ toolchain even though it uses Clang internally.

🔽 Download

https://visualstudio.microsoft.com/downloads/
https://my.visualstudio.com/Downloads?q=Visual%20Studio%202022 (17.14)
