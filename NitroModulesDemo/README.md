# Nitro Modules Demo 🚀

A high-performance showcase of **Nitro Modules**, the next generation of native modules for React Native. This project demonstrates how to build type-safe, synchronous, and zero-overhead native integrations using the **JavaScript Interface (JSI)**.

## 🌟 What are Nitro Modules?

Nitro Modules (developed by Marc Rousavy) represent the evolution beyond TurboModules. They eliminate the bridge overhead entirely by allowing JavaScript to call into native code (C++, Swift, Kotlin) with **zero serialization**.

### Key Features:
- **Direct JSI Calls**: Zero-overhead communication between JS and Native.
- **Type Safety**: Automatic code generation (Nitrogen) from TypeScript specs.
- **Modern Languages**: First-class support for Swift 5.9+ and Kotlin.
- **Synchronous Operations**: Call native methods directly in the JS thread.
- **Complex Data Support**: Seamless conversion of Objects, Arrays, and Enums.

---

## 🏗️ Architectural Improvements (The "Extra" Stuff)

This demo goes beyond a simple setup. It implementats industry-standard architectural patterns for production-ready apps:

### 1. Advanced Modular Pattern
- **Logic Isolation**: All business logic and state management are extracted into custom hooks (see `src/screens/hooks/useNitroDemo.ts`).
- **Atomic Components**: The main screen is decomposed into small, focused sub-components (see `src/screens/components/`) for better readability and maintainability.
- **Style Isolation**: Styles are kept in separate `.styles.ts` files, following the project's strict design mandates.

### 2. Strict Type Safety (No `any`)
- **Zero `any` Usage**: The entire module is 100% type-safe. We use proper generics and inheritance to satisfy the `HybridObject<{}>` constraint in the latest `react-native-nitro-modules` without resorting to `any`.
- **Enum Mapping**: Demonstrated how to handle numeric enums required by C++ JSI while maintaining friendly labels in the UI.

### 3. Production-Ready Configurations
- **Standardized `nitro.json`**: Configured with correct namespaces, module names, and **Autolinking** records.
- **Modern Safe Areas**: Replaced deprecated `SafeAreaView` with `react-native-safe-area-context` to ensure consistent UI across all modern mobile devices.

---

## 📂 Project Structure

- `src/specs/`: **TypeScript Specifications** (`.nitro.ts`). The source of truth for your modules.
- `src/modules/`: **JS Entry Points**. Clean, type-safe access to native modules.
- `src/screens/`: **UI Components** showcasing the modules using modular patterns.
- `src/screens/hooks/`: Custom hooks isolating native integration logic.
- `ios/NitroModulesDemo/`: **Swift Implementations**.
- `android/app/src/main/java/com/margelo/nitro/nitromodulesdemo/`: **Kotlin Implementations** (using standardized packages).
- `nitro.json`: **Configuration** for Nitrogen and Autolinking.

---

## 🛠️ Setup & Installation

### 1. Install Dependencies
```bash
cd NitroModulesDemo
npm install
```

### 2. Generate Native Interfaces (Codegen)
Nitro uses **Nitrogen** to generate native protocols (Swift) and abstract classes (Kotlin).
```bash
npm run nitro-codegen
```

#### 📂 About Generated Files (`nitrogen/generated/`)
Nitrogen produces a collection of C++, Swift, and Kotlin files in the `nitrogen/generated/` directory. These are **ephemeral "glue code"** files that bridge the gap between JavaScript and your native implementations.

- **⚠️ MODIFICATION RULE**: Generally, you should **NEVER** modify files in `nitrogen/generated/`. They are overwritten every time you run `nitro-codegen`.
- **Did I touch them?**: **YES.** Due to the specific nested structure of this repository, Nitrogen 0.35.2 generated paths and access levels that were incompatible with the standalone Android build. I have applied the following **Surgical Fixes** to the generated files:
  1. **Fixed Gradle Paths**: In `NitroModulesDemo+autolinking.gradle`, I corrected the source directory depth from `../` to `../../`.
  2. **Fixed CMake Paths**: In `NitroModulesDemo+autolinking.cmake`, I converted relative Nitrogen paths to absolute paths using `${CMAKE_CURRENT_SOURCE_DIR}` to prevent "File not found" errors during C++ compilation.
  3. **Exposed Loader**: In `NitroModulesDemoOnLoad.kt`, I changed the class from `internal` to `public` so it could be initialized from the `MainApplication`.

**Note for Developers**: If you re-run `npm run nitro-codegen`, you may need to re-apply these depth fixes (`../` -> `../../`) in the generated files until Nitrogen provides better support for standalone nested projects.

### 3. Native Setup
- **iOS**: 
  ```bash
  cd ios && bundle exec pod install
  ```
- **Android**: 
  1. Sync your project with Gradle files in Android Studio.
  2. The build pipeline is already pre-configured to handle Nitrogen outputs.

#### 🏗️ Native Build Integration (Android)
To ensure a seamless developer experience without touching generated files, I have implemented the following production-ready build pipeline:

1. **Gradle Integration**: Added `apply from: "../../nitrogen/generated/android/NitroModulesDemo+autolinking.gradle"` to `app/build.gradle` to automatically link Nitrogen's logic.
2. **Source Mapping**: Configured `sourceSets` in `build.gradle` to point the Kotlin compiler to `${project.projectDir}/../../nitrogen/generated/android/kotlin`, ensuring your implementations can always find their base specs.
3. **C++ JSI Pipeline (CMake)**: Created a modern CMake build system in `android/app/src/main/jni/CMakeLists.txt`. This compiles Nitrogen's C++ wrappers into a high-performance shared library (`libNitroModulesDemo.so`).
4. **Native Initialization**: Updated `MainApplication.kt` to call `NitroModulesDemoOnLoad.initializeNative()`. This ensures the JSI bindings are registered immediately when the app starts.
5. **16KB Page Size Support**: Added specific linker flags to `CMakeLists.txt` to ensure the native library is compatible with Android 15+ emulators and devices that use 16KB memory pages.

---

## 🚀 Running the Demo

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

---

## 📖 Learning Nitro

1.  **Define Spec**: Open `src/specs/MathModule.nitro.ts`.
2.  **Generate**: Run `npm run nitro-codegen`.
3.  **Implement**:
    - Swift: `ios/NitroModulesDemo/MathModule.swift`
    - Kotlin: `android/app/src/main/java/com/margelo/nitro/nitromodulesdemo/MathModule.kt`
4.  **Use**: Check `src/modules/MathModule.ts` for instantiation and `src/screens/hooks/useNitroDemo.ts` for usage.

---

*Part of the [React Native Reference & Learning Hub](../../README.md)*
