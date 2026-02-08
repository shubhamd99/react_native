# Root Detection in React Native

This project demonstrates how to detect if a device is rooted (Android) or jailbroken (iOS) using React Native.

## Libraries Used

1.  **[jail-monkey](https://github.com/GantMan/jail-monkey)**: A React Native library for identifying if a phone is rooted or jailbroken.
2.  **[react-native-device-info](https://github.com/react-native-device-info/react-native-device-info)**: Used here to detect if the app is running on an emulator, which is often a sign of a non-standard environment (and emulators are often rooted).

## Getting Started

### Prerequisites

- Node.js
- React Native CLI
- Android Studio / Xcode

### Installation

1.  Clone the repository.
2.  Install dependencies:

```bash
npm install
```

3.  Install iOS pods (iOS only):

```bash
cd ios && pod install && cd ..
```

### Running the App

**Android:**

```bash
npm run android
```

**iOS:**

```bash
npm run ios
```

## How it Works

The application uses `RootDetectionScreen.tsx` to display the status of various security checks.

### JailMonkey Checks

- **Rooted / Jailbroken**: Aggregated check for root/jailbreak.
- **Hook Detection**: Detects if the app is being hooked (e.g., Cydia Substrate).
- **Mock Location**: Detects if location is being mocked.
- **Trust Fall**: Heuristic check for suspicious environments.
- **Debugged Mode**: Checks if the app is being debugged.

### Device Info Checks

- **Is Emulator**: Checks if the device is an emulator. Emulators are often rooted by default, so this can be a secondary indicator.

## Usage in Code

See `RootDetectionScreen.tsx` for the implementation details.

```typescript
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';

// Check if jailbroken or rooted
const isRooted = JailMonkey.isJailBroken();

// Check if emulator
const isEmulator = await DeviceInfo.isEmulator();
```
