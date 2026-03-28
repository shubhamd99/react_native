# 🚀 Comprehensive Expo Guide (Production Grade)

Welcome to the ultimate reference for building production-grade applications using Expo in 2026. This folder has been configured to demonstrate the core tenets of modern Expo architecture.

## 1. File-Based Routing (`expo-router`)
Expo now utilizes file-based routing via `expo-router` (similar to Next.js).
- **Entry Point**: In `package.json`, the main entry is `"main": "expo-router/entry"`.
- **Structure**: All screens live in the `app/` directory.
  - `_layout.tsx`: Defines the UI wrapper for a directory (e.g., a Stack or Tabs navigator).
  - `index.tsx`: The default screen for a given directory.
- **Deep Linking**: Configured out of the box. By setting `"scheme": "expo-app"` in `app.json`, your app can be opened via `expo-app://`.

## 2. Optimizing Assets (`expo-image` & `@expo/vector-icons`)
- **`expo-image`**: A highly performant replacement for React Native's `<Image>`. It leverages Glide on Android and SDWebImage on iOS. It supports caching, animated SVGs, WebP, and **Blurhash** placeholders out of the box (as seen in `app/index.tsx`).
- **`@expo/vector-icons`**: Included by default. It's best practice to use this library rather than raw SVGs for standard iconography to reduce app bundle size.

## 3. Native Device APIs
We have implemented several APIs typical in production apps:
- **`expo-secure-store`**: Used to safely encrypt and store small values (like auth tokens) on the device (uses Keychain on iOS, Keystore on Android).
- **`expo-haptics`**: Provides tactile feedback for user interactions (e.g., vibrating when saving).
- **`expo-constants`**: Provides system info, device identifiers, and variables from your `app.json`.

## 4. Customizing Metro Bundler (`@expo/metro-config`)
In a production app, you often need to tweak how the JavaScript bundle is generated.
Look at `metro.config.js` in the root of this folder.
- **Why?** You might need to resolve custom file extensions (like `.cjs`), handle `.svg` files directly as React components using `react-native-svg-transformer`, or alias module paths.
- **How?** By extending `@expo/metro-config`'s `getDefaultConfig`, you ensure you don't break Expo's default behaviors while applying your specific modifications.

## 5. Turbo Modules & Expo Modules API (The "New Architecture")
Expo apps automatically support React Native's New Architecture (Fabric and Turbo Modules). 

**What are Turbo Modules?**
Previously, React Native passed asynchronous JSON messages over a "Bridge" between JS and Native code. Turbo Modules use **JSI (JavaScript Interface)**, allowing JS to hold direct references to C++ native objects. This makes native method calls synchronous and immensely faster.

**Expo Modules API:**
If you need to write custom native code (Swift/Kotlin), you no longer have to deal with the complex React Native bridging boilerplate. Expo provides the **Expo Modules API**.
- You write natural Swift/Kotlin.
- Expo automatically exposes it as a Turbo Module (JSI).
- To create one in your project, you would run: `npx create-expo-module --local`
- This scaffolds an `modules/` folder where you can drop native code that is immediately accessible in JS without manual linking.

## 6. Config Plugins & Prebuild
Notice the `plugins` array in `app.json`:
```json
"plugins": [
  "expo-router",
  "expo-image",
  "expo-secure-store"
]
```
Instead of modifying `android/` and `ios/` folders manually, Expo uses **Continuous Native Generation (CNG)**. When you run `npx expo prebuild` (or build in the cloud via EAS), Expo executes these plugins to automatically insert permissions, modify `AndroidManifest.xml`, `Info.plist`, and `Podfile`.

## 7. High-Performance State Management (`Zustand` + `MMKV`)
In a production app, global state needs to be fast and persistent.
- **Zustand**: A lightweight, hook-based state management library.
- **MMKV**: The fastest key-value storage for React Native (written in C++).

**Why this combo?**
Standard `AsyncStorage` is asynchronous and slow. MMKV is synchronous and uses direct memory mapping. When used with Zustand's `persist` middleware, your app's global state is automatically saved and restored instantly upon launch, without any "flicker" of initial state.

Implementation is found in `src/store/`:
- `storage.ts`: Connects Zustand to MMKV.
- `useAppStore.ts`: A persistent store example.

## 9. Environment Variables (.env)
Expo provides native support for `.env` files.
- **Prefix Requirement**: Any variable you want to access in your JavaScript code **must** start with `EXPO_PUBLIC_`.
- **Usage**: Access them anywhere via `process.env.EXPO_PUBLIC_VARIABLE_NAME`.
- **Security**: Variables with this prefix are bundled into your app's frontend code. Never put raw secrets (like private keys) in `EXPO_PUBLIC_` variables.


## 8. Structured Data & Files (`SQLite` + `FileSystem`)
For applications handling complex datasets or large files:
- **`expo-sqlite`**: A full-blown relational database. Perfect for thousands of items, complex filtering, and relationships. It is demonstrated in `app/database.tsx` using the modern `openDatabaseAsync` and `runAsync` API.
- **`expo-file-system`**: Gives you direct access to the device's storage. Use this to save images, download PDFs, or log large text files to the disk.