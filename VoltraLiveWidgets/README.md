# Voltra: Native Live Activities & Widgets in React (iOS-First)

This project demonstrates the implementation of **Voltra**, an Expo-compatible library primarily built for **iOS Live Activities and Dynamic Island**. It also provides partial Android Home Screen Widget support via Jetpack Compose Glance. All layouts are defined using React and JSX — no Swift or Kotlin required.

## 🚀 Key Features

- **Pure JSX Native UI:** No Swift or Kotlin required. Layouts are defined using `Voltra` (iOS) and `VoltraAndroid` (Android) primitives.
- **Live Activities:** Full support for Lock Screen and Dynamic Island (iOS).
- **Home Screen Widgets:** Comprehensive widget support for both iOS and Android.
- **Push Updates:** Securely update Live Activities via APNs (iOS) or FCM (Android) using remote JSON payloads.
- **Modular Architecture:** Business logic separated into custom hooks and UI into platform-aware primitives.

---

## 🛠️ Setup Instructions

### 1. Installation
```bash
npm install voltra
```

### 2. Configure App Plugin
Add the `voltra` plugin to your `app.json`. For Android widgets, you **must** define the widgets in the plugin options:

```json
{
  "expo": {
    "plugins": [
      [
        "voltra",
        {
          "widgets": [
            {
              "name": "weather-widget",
              "src": "./src/widgets/WeatherWidget.tsx",
              "android": {
                "minWidth": "100dp",
                "minHeight": "100dp",
                "updatePeriodMillis": 1800000,
                "description": "Local Weather Widget"
              }
            }
          ]
        }
      ]
    ]
  }
}
```

### 3. Generate Native Targets
Voltra requires custom native targets (iOS Extensions and Android Glance). You must run prebuild:
```bash
npx expo prebuild --clean
```

---

## 📱 Platform-Specific Usage

### 🧱 Native Primitives
Voltra maps JSX to **SwiftUI** (iOS) and **Jetpack Compose Glance** (Android).

| Concept | iOS (`Voltra`) | Android (`VoltraAndroid`) |
|-----------|----------------|---------------------------|
| **Vertical Stack** | `<Voltra.VStack>` | `<VoltraAndroid.Column>` |
| **Horizontal Stack** | `<Voltra.HStack>` | `<VoltraAndroid.Row>` |
| **Stack Alignment** | `alignment` | `verticalAlignment`, `horizontalAlignment` |
| **Interactivity** | `onPress` (App Intents) | `onPress` (Pending Intents) |

### 🤖 Android-Specific Implementation
Android widgets use Jetpack Compose Glance, which has different layout rules than SwiftUI.
- **Alignment:** Use props like `verticalAlignment="center-vertically"` and `horizontalAlignment="center-horizontally"`.
- **Sizing:** Use `"100%"` for full width/height.
- **Child Limit:** Android `RemoteViews` (Glance) limits stacks to 10 children.

### ⚡ Live Activities (iOS)
Managed via the `useLiveActivity` hook. Supports Lock Screen and all Dynamic Island states.

### 🏠 Home Screen Widgets
Widgets are registered via the `voltra` plugin in `app.json` and implemented by exporting a `WidgetVariants` object.

```tsx
// src/widgets/WeatherWidget.tsx
import { type WidgetVariants } from 'voltra';

const variants: WidgetVariants = {
  systemSmall: <WeatherSmallUI />,
  systemMedium: <WeatherMediumUI />,
};

export default variants;
```

---

## 📡 Remote Push Updates

Voltra allows updating Live Activities remotely without the app being in the foreground.

1. **Token Retrieval:** Use `const { pushToken } = useLiveActivity(...)` to get the unique activity token.
2. **Backend Update:** Send the token to your server.
3. **JSON Payload:** Send a push notification (APNs/FCM) with a JSON payload representing the updated JSX structure.

---

## 📂 Project Structure

- `src/components/voltra/`: Platform-aware UI primitives (`VStack`, `HStack`, `Card`).
- `src/live-activities/`: iOS Live Activity implementations.
- `src/widgets/`: Home Screen Widget registration and layouts.
- `src/app/`: Main application screens and demo UI.

---

## Android Support — Honest Picture

Voltra is primarily an **iOS-first library**. Here is the honest picture for Android specifically.

### What Voltra supports on Android

- **Home Screen Widgets** via Jetpack Compose Glance — compose native interfaces using Glance primitives directly in JSX.
- **Push updates** via FCM (Firebase Cloud Messaging) to stream lifecycle updates and build server-driven widget refreshes.

### What Voltra does NOT support on Android

- **Live Activities** and **Dynamic Island** are iOS-only Apple features. Android has no equivalent platform API. The core selling point of Voltra — Live Activities — simply does not exist on Android.

### Current Android status

Android support is planned for the future once the core iOS experience is fully polished. This will involve defining Android-specific primitives and implementing the native engine in Kotlin (by Callstack). Android widget support via Glance exists, but it is not as mature or feature-complete as the iOS side.

### Platform feature matrix

| Feature | iOS | Android |
|---|---|---|
| Live Activities | Yes | No (iOS only) |
| Dynamic Island | Yes | No (iOS only) |
| Home Screen Widgets | Yes (WidgetKit) | Partial (Glance) |
| Push updates | ActivityKit | FCM |
| Hot reload | Yes | Yes |
| Expo Dev Client required | Yes | Yes |

> **Note for order tracking / delivery status use cases:** Voltra is very compelling on iOS for Live Activity-style features (e.g. Swiggy order tracking). On Android, this would need a separate native approach or wait for Voltra's Android engine to mature.
