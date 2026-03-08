# React Native Reference & Learning Hub

This repository is a curated collection of React Native projects, architectural patterns, and performance-optimized modules. It serves as both a learning resource and a production-ready reference for advanced React Native development.

## Repository Structure

The repository consists of multiple independent React Native projects and modules, each focusing on specific concepts:

- **Core Architecture:** `mvvm_example` (Reference), `ReduxSaga`, `mono_repo_yarn`.
- **Performance & Native:** `analytics` (TurboModule), `mmkv` (JSI), `watermelon_db_jsi`, `NativeModuleWithKotlin`, `TurboDemo`.
- **UI & Animations:** `animated_flatlist`, `AnimatedInput`, `bottomsheet_gesturehandler`, `carousel`, `lottieAndRive`.
- **Specialized Widgets:** `otpWidget`, `QrAndBarcodeScanner`, `widgetApp`.
- **Advanced Networking & Storage:** `grpc_react_native`, `turbo-secure-storage`.

## AI Interaction Guidelines

When working in this repository, adhere to the following mandates:

### 1. Technical Depth & Standards
- **New Architecture:** Prioritize the "New Architecture" (Fabric, TurboModules, JSI) where applicable. Reference `analytics` or `TurboDemo` for standard implementations.
- **Architectural Pattern (MVC):** Prefer a clean **Model-View-Controller (MVC)** approach. Utilize modern state management like **Zustand** or **Jotai (atoms)** to handle business logic and state, keeping the View layer focused on presentation. Note that `mvvm_example` exists solely as a reference and should not be used as the template for new features.
- **Performance First:** Use `reanimated`, `gesture-handler`, and `FlashList` (or `recyclerlistview`) for high-performance UI. Avoid heavy bridge-based animations.
- **Thread Safety:** In native (Kotlin/Java/Objective-C/C++) code, follow the "One Lock Rule" and use thread-safe constructs as seen in the `analytics` module.

### 2. Contextual Research
- **Root README:** The root `README.md` contains extensive documentation on React Native internals (TTI, Threading, Hermes, Bridge vs JSI). Always reference it for conceptual grounding before suggesting architectural changes.
- **Module-Specific READMEs:** Each sub-project may have its own `README.md` (e.g., `analytics/README.md`) which defines its specific architecture and usage. Read these before modifying sub-projects.

### 3. Implementation Workflow
- **Surgical Changes:** Most projects are independent. Do not introduce global dependencies unless specifically requested.
- **Native Integration:** Be prepared to modify `android/` and `ios/` folders. This repository emphasizes native-to-JS communication (TurboModules, Codegen).
- **Validation:** Always verify changes by checking both the JS side (TypeScript/Flow) and the Native side (Kotlin/Swift). If adding a TurboModule, ensure `codegenConfig` in `package.json` is updated.

### 4. Testing & Reliability
- **Jest & Detox:** Favor Jest for unit testing and Detox for E2E testing.
- **Error Handling:** Implement robust retry logic and offline support for networking modules, following the patterns in `analytics`.

## Preferred Tech Stack
- **Framework:** React Native (0.70+ with Hermes enabled)
- **Language:** TypeScript for JS, Kotlin for Android, Swift for iOS
- **State Management:** **Zustand**, **Jotai**, or Redux Toolkit (Slices)
- **Styling:** Vanilla CSS, NativeWind (in `NativeWindDLS`)
- **Animation:** Reanimated 2/3, Lottie, Rive

---
*Note: This repository is a living reference. When adding new examples, ensure they are well-documented and follow the high standards of existing production-ready modules.*
