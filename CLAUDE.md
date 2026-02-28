# React Native Examples Repo — Claude Context

## Repo Purpose
This is a collection of standalone React Native example projects, each demonstrating a specific concept, library, or architecture pattern. Each subdirectory is an independent RN project.

## Project Index

| Folder | Concept Demonstrated |
|---|---|
| `AbsoluteImports` | Absolute import paths via babel-plugin-module-resolver |
| `analytics` | Analytics batching via Native Module |
| `animated_flatlist` | FlatList with Reanimated animations |
| `AnimatedInput` | Animated text input UX |
| `bottomsheet_gesturehandler` | Bottom sheet with react-native-gesture-handler |
| `carousel` | Carousel/swiper component |
| `DimensionStrategy` | Responsive layout dimension strategies |
| `drag_reactangle_reanimated` | Draggable UI with Reanimated |
| `grpc_react_native` | gRPC integration in React Native |
| `interpolate_scrollview_reanimated` | ScrollView interpolation with Reanimated |
| `lottieAndRive` | Lottie vs Rive animations comparison |
| `mmkv` | MMKV fast key-value storage (JSI-based) |
| `mono_repo_yarn` | Yarn workspaces monorepo setup |
| `mvvm_example` | MVVM architecture pattern |
| `mypodcast` | Podcast player UI example |
| `NativeModuleWithKotlin` | Kotlin-based Native Module |
| `NativeWindDLS` | NativeWind (Tailwind CSS) design language system |
| `otpWidget` | OTP input widget |
| `QrAndBarcodeScanner` | QR and barcode scanning |
| `react-native-background-timer-workmanager` | Background timer with WorkManager |
| `ReduxSaga` | Redux Saga state management |
| `RootDetection` | Jailbreak/root detection |
| `Storybook` | Storybook for React Native components |
| `suspense_and_freeze` | React Suspense + React Freeze |
| `TurboDemo` | Turbo Native Modules (New Architecture) |
| `turbo-secure-storage` | Secure storage via Turbo Module |
| `watermelon_db_jsi` | WatermelonDB with JSI |
| `widgetApp` | iOS/Android widget integration |

## Architecture Philosophy
- Each project is **self-contained** — no cross-project dependencies
- Projects demonstrate **one concept** at a time
- New projects should be minimal and focused

## Coding Standards (enforced for all projects)
- TypeScript only (`.ts` / `.tsx`)
- Functional components with hooks
- `StyleSheet.create()` for styles (unless using NativeWind)
- No `console.log` in committed code
- `SafeAreaView` for screen roots
- `FlatList` / `FlashList` for lists (not `ScrollView` + `.map()`)
- `useNativeDriver: true` for all applicable animations
- Secure storage for sensitive data (not AsyncStorage)

## Available Skills (slash commands)

### Core
- `/rn-best-practices` — Full React Native best practices guide (TypeScript, styling, state, security, testing)
- `/rn-component` — Generate a production-ready component, screen, or custom hook
- `/rn-performance` — Audit and fix performance issues (re-renders, lists, animations, bundle)
- `/rn-review` — Structured code review: Critical / Major / Minor / Praise
- `/rn-new-project` — Scaffold a new example project in this repo

### Callstack Ecosystem
- `/rn-testing` — React Native Testing Library (RNTL) patterns — maintained by Callstack
- `/rn-animations` — Reanimated v3 + Gesture Handler v2 patterns (worklets, gestures, layout animations)
- `/rn-paper` — React Native Paper (Material Design 3 components) — maintained by Callstack
- `/rn-repack` — Re.Pack bundler, code splitting, Module Federation / super apps — maintained by Callstack

## Tech Stack (commonly used across projects)
- React Native (latest stable)
- TypeScript
- React Navigation v6
- Reanimated v3
- Gesture Handler v2
- Redux Toolkit + Redux Saga (where applicable)
- MMKV for storage
- Hermes engine

## Key Concepts in This Repo
See README.md for detailed explanations of:
- RN Threading Model (JS Thread, UI Thread, Shadow Thread)
- Bridge vs JSI vs Turbo Modules
- Fabric (New Renderer)
- Hermes engine (AOT compilation)
- Animations (Animated, Reanimated, Lottie, Rive)
- Performance (FlatList tuning, RecyclerListView)
- MVVM architecture
- Monorepo setup

## When helping with this repo
1. Always check which project folder is being worked on — each has its own `package.json`
2. Respect the existing pattern of the project being edited
3. Prefer showing/explaining the concept over adding unnecessary abstractions
4. When creating new example code, add a comment block at the top explaining what concept it demonstrates
