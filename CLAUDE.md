# CLAUDE.md — React Native Examples Repository

## Repo Overview

A curated collection of **28 standalone React Native example projects**, each demonstrating a specific concept, library, or architecture pattern. Projects are independent — each has its own `package.json`, `android/`, and `ios/` directories.

- **Platform**: React Native (iOS + Android)
- **Language**: TypeScript (all projects)
- **JS Engine**: Hermes (default on RN 0.70+)
- **RN Version Range**: 0.68 (oldest) → 0.84 (newest)

---

## Project Index

| Folder | Concept / Purpose | RN Version | Key Libraries |
|---|---|---|---|
| `AbsoluteImports` | Path aliasing with `@app/*` imports | 0.71.8 | babel-plugin-module-resolver |
| `analytics` | Analytics native module (Turbo Module) | 0.84.0 | CodeGen, Kotlin (useKotlin: true) |
| `animated_flatlist` | FlatList + Reanimated scroll animations | 0.71.3 | react-native-reanimated 3.x |
| `AnimatedInput` | Enter/exit input animations (core only) | 0.72.6 | — |
| `bottomsheet_gesturehandler` | Gesture-driven bottom sheet modal | 0.71.3 | gesture-handler 2.x, reanimated 3.x |
| `carousel` | Image carousel with SVG icons | 0.71.8 | react-native-svg, react-native-vector-icons |
| `DimensionStrategy` | Responsive layout / safe area strategy | 0.83.1 | react-native-safe-area-context 5.x |
| `drag_reactangle_reanimated` | Draggable element with gestures | 0.71.3 | gesture-handler 2.x, reanimated 3.x |
| `grpc_react_native` | gRPC client (alternative to REST/GraphQL) | 0.71.3 | gRPC native setup |
| `interpolate_scrollview_reanimated` | Scroll interpolation animations | 0.71.3 | react-native-reanimated 3.x |
| `lottieAndRive` | Lottie vs Rive animation comparison | 0.84.0 | lottie-react-native 7.x, rive-react-native 9.x |
| `mmkv` | JSI-based key-value storage | 0.83.1 | react-native-mmkv 4.x, react-native-nitro-modules |
| `mono_repo_yarn` | Yarn Workspaces monorepo setup | N/A | Yarn workspaces (`packages/*`) |
| `mvvm_example` | MVVM architecture pattern | 0.71.6 | @reduxjs/toolkit, react-redux, react-navigation |
| `mypodcast` | Full podcast/audio streaming app | 0.74.1 | @apollo/client, react-native-track-player |
| `NativeModuleWithKotlin` | Kotlin native bridge modules | 0.71.10 | react-native-super-grid |
| `NativeWindDLS` | Tailwind CSS via NativeWind | 0.83.1 | nativewind 4.x, tailwindcss 3.x |
| `otpWidget` | OTP input widget | 0.71.8 | react-native-vector-icons, styled-components |
| `QrAndBarcodeScanner` | Camera-based QR/barcode scanning | 0.71.7 | react-native-vision-camera 2.x |
| `react-native-background-timer-workmanager` | Android WorkManager background timers (npm package) | 0.68.1 | — |
| `ReduxSaga` | Redux + Saga side-effect management | 0.83.1 | @reduxjs/toolkit 2.x, redux-saga 1.4.x |
| `RootDetection` | Root/jailbreak device detection | 0.83.1 | jail-monkey, react-native-device-info |
| `Storybook` | On-device component library/design system | 0.73.2 | @storybook/react-native 6.x, styled-components |
| `suspense_and_freeze` | React 18 Suspense + React Freeze | 0.71.7 | react-freeze |
| `TurboDemo` | Turbo Modules (New Architecture) demo | 0.83.1 | CodeGen config |
| `turbo-secure-storage` | Published Turbo Module — Keychain/KeyStore secure storage | 0.68.0 | C++ JSI bindings, CodeGen |
| `watermelon_db_jsi` | WatermelonDB JSI SQLite local storage | 0.71.4 | @nozbe/watermelondb, recompose |
| `widgetApp` | Home screen widget implementation | 0.73.7 | — |

---

## Coding Standards

### TypeScript
- **TypeScript only** — no plain `.js` files in source
- Use `interface` for object shapes, `type` for unions/aliases
- No `any` types — use proper generics or `unknown` where needed
- Prefer explicit return types on all exported functions and components

### Components
- **Functional components only** — no class components
- Use `React.FC<Props>` or explicit prop typing
- Keep components in their own files; no multi-component files
- Prefer named exports over default exports for components

### Styling
- Use `StyleSheet.create()` by default in all non-NativeWind projects
- `NativeWindDLS` project uses Tailwind class strings — no `StyleSheet` there
- `otpWidget` and `Storybook` use `styled-components` — follow existing pattern per project
- No inline style objects in JSX (e.g., `style={{ margin: 10 }}`) — always use `StyleSheet`

### Lists
- Use `FlatList` or `FlashList` for all lists — **never** `ScrollView` + `.map()`
- Set `keyExtractor` explicitly — never rely on index as key
- Optimize with `getItemLayout` for fixed-height items
- Avoid inline `renderItem` arrow functions — define outside component

### Animations
- Always set `useNativeDriver: true` on `Animated` API calls (non-layout props only)
- For layout animations or complex interactions → use `react-native-reanimated` with worklets
- Pair `react-native-gesture-handler` with Reanimated for gesture-driven animations
- Postpone heavy work during animations using `InteractionManager.runAfterInteractions()`

### Storage
- **Never use AsyncStorage for sensitive data** — use `turbo-secure-storage` (Keychain/KeyStore) or MMKV
- Use `react-native-mmkv` for high-performance key-value storage (JSI-based, synchronous)
- Use WatermelonDB for complex relational/offline-first data

### Code Quality
- No `console.log` in committed code
- No commented-out code blocks
- No unused imports or variables
- Handle loading and error states explicitly in all data-fetching components

---

## Architecture Patterns

### New Architecture (Turbo Modules / JSI)
Projects: `TurboDemo`, `turbo-secure-storage`, `analytics`, `mmkv`

- Define specs in TypeScript using `TurboModuleRegistry`
- Run CodeGen to generate native scaffolding: `cd android && ./gradlew generateCodegenArtifactsFromSchema`
- C++ implementation in `turbo-secure-storage`; Kotlin in `analytics`
- Cannot use Remote JS Debugger with Turbo Modules — use Flipper or Chrome DevTools via Hermes

### MVVM Pattern
Project: `mvvm_example`

```
View → ViewController → ViewModel → Model
                    ↑
                 Provider (dependency injection)
```
- `ViewModel` is a plain JS class — no framework coupling
- `ViewController` can talk to multiple ViewModels
- `Model` handles network/database/services

### Redux + Saga
Project: `ReduxSaga`

- Use `@reduxjs/toolkit` slices for reducers + actions
- Sagas handle async side effects (API calls, timers)
- Redux Toolkit's `createSlice` auto-generates action types

### Monorepo (Yarn Workspaces)
Project: `mono_repo_yarn`

- Packages live under `packages/*`
- Hoist shared dependencies to root `node_modules`
- Use `nohoist` for React Native native dependencies

---

## Key Library Notes

### Reanimated 3.x
- Define animations using `useSharedValue` + `useAnimatedStyle`
- Run worklets on UI thread — no bridge overhead
- Supports animating ALL style props (including height, color) — unlike core `Animated`

### NativeWind 4.x (`NativeWindDLS`)
- Use `className` prop instead of `style`
- Configure `tailwind.config.js` with `content` paths
- Requires `react-native-css-interop`
- `patch-package` patches are applied post-install

### Vision Camera 2.x (`QrAndBarcodeScanner`)
- Requires camera permissions (both platforms)
- Use `useCameraDevices()` + `useCodeScanner()` hooks
- Frame processors run via JSI worklets

### WatermelonDB (`watermelon_db_jsi`)
- Uses `@observable` + `@field` decorators — enable `experimentalDecorators` in tsconfig
- `recompose` HOCs wrap components with observables
- JSI-based SQLite: fast synchronous queries

### Lottie vs Rive (`lottieAndRive`)
- **Lottie**: JSON from Adobe AE via BodyMovin plugin; static, limited runtime control
- **Rive**: State-machine driven; smaller file size; more FPS; full runtime control
- Prefer Rive for interactive animations; Lottie for simple playback

---

## Common Commands

Each project is a standalone RN app. Run from within the project folder:

```bash
# Install dependencies
npm install
# or for Node 20+ projects (DimensionStrategy, TurboDemo):
npm install  # ensure node >= 20

# iOS
npx pod-install          # install CocoaPods
npx react-native run-ios

# Android
npx react-native run-android

# Metro bundler
npx react-native start --reset-cache

# TypeScript check
npx tsc --noEmit

# Check unused dependencies
npx depcheck
```

---

## Node Version Requirements

| Projects | Minimum Node |
|---|---|
| `DimensionStrategy`, `TurboDemo` | Node >= 20 |
| `mypodcast` | Node >= 18 |
| All others | Node >= 16 |

---

## Performance Checklist

When adding features to any project in this repo:

- [ ] Lists use `FlatList`/`FlashList`, not `ScrollView.map`
- [ ] Animations use `useNativeDriver: true` or Reanimated worklets
- [ ] No heavy computation on the JS thread during animations
- [ ] Images are appropriately sized (avoid 1080p in lists)
- [ ] `React.memo` applied to expensive list item components
- [ ] Sensitive data in Keychain/MMKV, not AsyncStorage
- [ ] No `console.log` statements committed

---

## Debugging

- **Hermes + Flipper**: Use for Turbo Module projects (no remote debugger)
- **React DevTools**: `npx react-devtools` for component tree inspection
- **Metro logs**: `npx react-native start` shows bundler errors
- **Android logs**: `adb logcat` or Android Studio Logcat
- **iOS logs**: Xcode console or `xcrun simctl spawn booted log stream`

---

## Skills Available

| Command | Purpose |
|---|---|
| `/react-native-best-practices` | Performance optimization guide (FPS, TTI, bundle size, memory leaks) |
| `/simplify` | Review changed code for quality, reuse, and efficiency |
| `/claude-api` | Build with the Claude / Anthropic API |
| `/keybindings-help` | Customize Claude Code keyboard shortcuts |
