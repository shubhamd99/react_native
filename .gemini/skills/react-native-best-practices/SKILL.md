---
name: react-native-best-practices
description: Performance optimization and high-quality coding standards for React Native. Use when debugging FPS drops, optimizing TTI, reducing bundle size, or reviewing code for architectural integrity, memory leaks, and New Architecture (TurboModules/JSI) patterns.
---

# React Native Best Practices & Optimization

## Overview

This skill provides expert guidance for building and optimizing high-performance React Native applications. It covers architectural patterns, coding standards, and a systematic "Measure → Optimize → Re-measure" workflow for performance issues.

## Technical Standards

### Coding Style
- **TypeScript Only**: No `.js` files in source. Use `interface` for shapes, `type` for unions/aliases.
- **Functional Components**: Use `React.FC<Props>` or explicit prop typing. No class components.
- **Surgical Component Files**: One component per file; preferred named exports.
- **No `any`**: Use proper generics or `unknown`. Explicit return types on exports.

### UI & Styling
- **StyleSheet.create()**: Default for all projects (except NativeWind). No inline styles in JSX.
- **Lists**: Always use `FlatList` or `FlashList`. **Never** use `ScrollView` + `.map()`.
- **Animations**:
  - `Animated` API: Always set `useNativeDriver: true` for non-layout props.
  - `Reanimated 3.x`: Preferred for complex interactions. Use worklets on the UI thread.
  - `InteractionManager`: Postpone heavy work during animations using `runAfterInteractions()`.

### Storage & Data
- **Sensitive Data**: **Never** use `AsyncStorage`. Use `turbo-secure-storage` (Keychain/KeyStore) or MMKV.
- **High Performance**: Use `react-native-mmkv` for synchronous, JSI-based key-value storage.
- **Relational Data**: Use WatermelonDB for offline-first, JSI-powered SQLite storage.

## Performance Optimization Workflow

Follow this cycle: **Measure → Optimize → Re-measure → Validate**

1. **Measure**: Capture baseline metrics (FPS, TTI, bundle size).
2. **Optimize**: Apply the targeted fix from the relevant reference.
3. **Re-measure**: Run the same measurement to get updated metrics.
4. **Validate**: Confirm improvement (e.g., FPS 45→60, TTI 3.2s→1.8s).

### Priority-Ordered Guidelines

| Priority | Category | Impact | References |
|----------|----------|--------|------------|
| 1 | FPS & Re-renders | CRITICAL | `js-measure-fps.md`, `js-profile-react.md`, `js-lists-*` |
| 2 | Bundle Size | CRITICAL | `bundle-analyze-js.md`, `bundle-barrel-exports.md` |
| 3 | TTI Optimization | HIGH | `native-measure-tti.md`, `bundle-hermes-mmap.md` |
| 4 | Native Performance | HIGH | `native-turbo-modules.md`, `native-threading-model.md` |
| 5 | Memory Management | MEDIUM-HIGH | `js-memory-leaks.md`, `native-memory-leaks.md` |
| 6 | Animations | MEDIUM | `js-animations-reanimated.md` |

## Problem → Reference Mapping

Read the corresponding file in `references/` when encountering these issues:

| Problem | Start With |
|---------|-----------|
| App feels slow/janky | `js-measure-fps.md` → `js-profile-react.md` |
| Too many re-renders | `js-profile-react.md` → `js-react-compiler.md` |
| Slow startup (TTI) | `native-measure-tti.md` → `bundle-analyze-js.md` |
| Large app size | `bundle-analyze-app.md` → `bundle-r8-android.md` |
| Memory growing | `js-memory-leaks.md` or `native-memory-leaks.md` |
| Animation drops frames | `js-animations-reanimated.md` |
| List scroll jank | `js-lists-flatlist-flashlist.md` |
| TextInput lag | `js-uncontrolled-components.md` |
| Native module slow | `native-turbo-modules.md` → `native-threading-model.md` |
| Native library alignment | `native-android-16kb-alignment.md` |

## Architecture Patterns

### New Architecture (Turbo Modules / JSI)
- **Codegen**: Run `./gradlew generateCodegenArtifactsFromSchema` after spec changes.
- **No Remote Debugging**: Use Flipper or Chrome DevTools via Hermes for Turbo Modules.
- **Thread Safety**: Follow the "One Lock Rule" in native code.

### MVVM Pattern
- `ViewModel`: Plain JS class (no framework coupling).
- `ViewController`: Mediates between View and multiple ViewModels.
- `Model`: Encapsulates data fetching and services.

## Debugging Checklist
- [ ] No `console.log` in committed code.
- [ ] No commented-out code blocks.
- [ ] No unused imports or variables.
- [ ] `React.memo` applied to expensive list item components.
- [ ] Assets are appropriately sized (avoid 1080p in lists).

---
*Based on Callstack's "The Ultimate Guide to React Native Optimization".*
