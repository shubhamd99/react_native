# Scaffold New React Native Project

Set up a new React Native project with production-ready structure and tooling.

## Steps to scaffold

When the user asks to create a new example/demo project in this repo:

### 1. Create the project
```bash
npx @react-native-community/cli@latest init $PROJECT_NAME --template react-native-template-typescript
# or for Expo:
npx create-expo-app $PROJECT_NAME --template expo-template-blank-typescript
```

### 2. Folder structure to set up
```
$PROJECT_NAME/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # React Navigation setup + types
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── hooks/            # Custom hooks
│   ├── store/            # State management
│   ├── services/         # API clients, native services
│   ├── utils/            # Pure utility functions
│   ├── constants/        # Colors, spacing, config
│   └── types/            # Shared TypeScript types
├── __tests__/
├── android/
├── ios/
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── tsconfig.json
└── package.json
```

### 3. Essential packages to install
```bash
# Navigation
yarn add @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

# Gesture & Animation (New Architecture compatible)
yarn add react-native-reanimated react-native-gesture-handler

# Dev tooling
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-native eslint-plugin-react-hooks prettier
```

### 4. tsconfig.json baseline
```json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@constants/*": ["src/constants/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"]
    },
    "strict": true
  }
}
```

### 5. babel.config.js for absolute imports
```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@components': './src/components',
        '@screens': './src/screens',
        '@hooks': './src/hooks',
        '@utils': './src/utils',
        '@constants': './src/constants',
        '@services': './src/services',
        '@store': './src/store',
      },
    }],
    'react-native-reanimated/plugin', // must be last
  ],
};
```

### 6. README template
Add a README documenting:
- Purpose of the project/example
- How to run (iOS/Android commands)
- Key concepts demonstrated
- Notable packages used

## Rules
- Match the style of existing examples in this repo
- Keep example projects focused on ONE concept
- Add a comment at the top of key files explaining the concept being demonstrated
- Always add the project to the root `README.md` table of contents
