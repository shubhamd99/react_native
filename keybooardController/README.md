# React Native Keyboard Controller Examples

This project demonstrates the usage of `react-native-keyboard-controller` in an Expo environment (SDK 55) using the **New Architecture** and **Reanimated 4**.

## 🚀 Features

- **Standard Handling**: Using `KeyboardAvoidingView` and `KeyboardAwareScrollView` for automatic layout management.
- **Fluid Animations**: Real-time tracking of keyboard height using `useKeyboardHandler` and Reanimated 4.
- **Sticky UI**: Components that track the keyboard movement with 0-latency.
- **Interactive Tools**: Using `KeyboardToolbar` for enhanced input navigation.

## 📁 Project Structure

```text
keybooardController/
├── src/
│   └── examples/
│       ├── Basic/                # Simple avoiding & scrolling
│       ├── StickyFooter/         # Custom height tracking with Reanimated
│       └── AdvancedInteractive/  # Toolbars and lifecycle events
├── App.tsx                       # Main menu and Provider setup
└── App.styles.ts                 # Global project styles
```

## 🛠️ Configuration

This project is configured for **Expo SDK 55 (Canary)** and requires the following setup for Reanimated 4 and Worklets:

- **Babel**: Uses `react-native-worklets/plugin`.
- **Metro**: Wrapped with `wrapWithReanimatedMetroConfig`.
- **Architecture**: Runs on the **New Architecture** (Fabric).

## 🏃 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Clear cache (recommended)**:
   ```bash
   npx expo start --clear
   ```

3. **Run on Android (Development Build required)**:
   ```bash
   npx expo run:android
   ```

4. **Run on iOS (Development Build required)**:
   ```bash
   npx expo run:ios
   ```

*Note: Since this library uses native code and the New Architecture, it will NOT work in the standard Expo Go app. You must use a Development Build.*

## 📚 Examples Explained

### 1. Basic Usage
Demonstrates how to replace the standard React Native `KeyboardAvoidingView` with a more stable, non-jumping alternative that works perfectly on both platforms.

### 2. Sticky Footer
Uses `useKeyboardHandler` to drive a Reanimated `SharedValue`. This allows a footer button to "stick" to the keyboard as it moves, without any delay or bridge lag.

### 3. Advanced Interaction
Shows the `KeyboardToolbar` for navigating between multiple inputs and uses worklets to change UI state (like header colors) based on whether the keyboard is open or closed.
