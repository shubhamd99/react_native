# MMKV Documentation

This project demonstrates the usage of `react-native-mmkv`, a high-performance key-value storage library for React Native.

## Introduction

MMKV is an efficient, small, and easy-to-use mobile key-value storage framework developed by WeChat. `react-native-mmkv` is a library that allows you to use MMKV inside your React Native applications utilizing JSI (JavaScript Interface) for direct C++ bindings, making it significantly faster than AsyncStorage.

## Installation

```sh
npm install react-native-mmkv
# or
yarn add react-native-mmkv
```

## Basic Usage

### Creating an Instance

You can create a storage instance using `createMMKV()`.

```typescript
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();
```

### Supported Data Types

MMKV supports the following data types:

- `string`
- `number`
- `boolean`
- `Uint8Array` (Buffer)
- `object` (via `JSON.stringify` / `JSON.parse` or `useMMKVObject`)

### Methods

#### 1. Set Value

```typescript
storage.set('username', 'John Doe'); // String
storage.set('age', 25); // Number
storage.set('isViP', true); // Boolean
```

#### 2. Get Value

```typescript
const username = storage.getString('username'); // 'John Doe' | undefined
const age = storage.getNumber('age'); // 25 | undefined
const isViP = storage.getBoolean('isViP'); // true | undefined
```

#### 3. Delete Value

```typescript
storage.remove('username');
```

#### 4. Check Existence

```typescript
const hasKey = storage.contains('username');
```

#### 5. Global Operations

```typescript
const allKeys = storage.getAllKeys(); // Returns an array of strings
storage.clearAll(); // Deletes everything
```

## Hooks

`react-native-mmkv` provides hooks for reactive updates in React components.

```typescript
import {
  useMMKVString,
  useMMKVNumber,
  useMMKVBoolean,
  useMMKVObject,
} from 'react-native-mmkv';

const [name, setName] = useMMKVString('user.name');
const [age, setAge] = useMMKVNumber('user.age');
const [isViP, setIsViP] = useMMKVBoolean('user.isViP');
const [user, setUser] = useMMKVObject('user.obj');
```

## Advanced Features

### Safe/Secure Storage

You can create an encrypted instance by providing an encryption key.

```typescript
export const secureStorage = createMMKV({
  id: 'secure-storage',
  encryptionKey: 'my-secret-key',
});
```

### Buffer Support

You can store binary data using `Uint8Array`.

```typescript
const buffer = new Uint8Array([1, 2, 3]);
storage.set('buffer', buffer.buffer);
const retrieved = storage.getBuffer('buffer');
```

### Listeners

Listen to storage changes globally.

```typescript
const listener = storage.addOnValueChangedListener(key => {
  console.log(`Key changed: ${key}`);
});
// Remove listener when done
listener.remove();
```

### Recrypt

Change the encryption key dynamically.

```typescript
storage.recrypt('new-key');
```

### Trim

Optimize storage size by removing empty spaces.

```typescript
storage.trim();
```

## Project Structure

- `src/utils/storage.ts`: MMKV instances configuration.
- `src/components/`: Modular components for different operations (`BasicOperations`, `TypedOperations`, `AdvancedOperations`, `HooksDemo`).
- `src/screens/MMKVDemo.tsx`: Main screen integrating all demos.
