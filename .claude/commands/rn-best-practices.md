# React Native Best Practices

When writing or reviewing React Native code in this repo, enforce the following best practices:

## Project Architecture
- Use **feature-based folder structure**: group files by feature, not by type
- Prefer `src/` as root with subfolders: `components/`, `screens/`, `hooks/`, `utils/`, `store/`, `services/`, `navigation/`
- Use **absolute imports** (configured via `babel-plugin-module-resolver` or `tsconfig paths`) — this repo has an `AbsoluteImports` example
- Co-locate component styles, tests, and types in the same folder as the component

## TypeScript
- Always use TypeScript — no `any` unless wrapping a truly untyped third-party API (add `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with a comment explaining why)
- Define prop types with `interface` (not `type`) for components: `interface MyComponentProps { ... }`
- Use `FC<Props>` or explicit return type `React.ReactElement` for components
- Export types from an `index.ts` barrel where appropriate

## Components
- Functional components only — no class components
- One component per file; filename matches the export name (PascalCase)
- Destructure props at the function signature
- Use `memo()` only when profiling shows it helps — don't prematurely memoize
- Keep components small: if a component exceeds ~150 lines, split it

## State Management
- Local UI state: `useState` / `useReducer`
- Shared/global state: use the pattern already in the project (Redux Saga or Zustand or Context)
- Async data fetching: prefer React Query / SWR over manual `useEffect` + `useState` fetch patterns
- Never put derived state into `useState` — compute it during render

## Styling
- Use **StyleSheet.create()** for all styles — never inline style objects (they create new objects on every render)
- If using NativeWind/Tailwind (see `NativeWindDLS` example), use className exclusively; don't mix with StyleSheet
- Avoid magic numbers — define spacing, font sizes, and colors as design tokens/constants
- Support both light and dark mode using `useColorScheme` or a theme context

## Navigation
- Use React Navigation v6+ with typed navigator params (`RootStackParamList`)
- Define all route names as constants or an enum
- Never navigate from inside a component render — always use callbacks or event handlers

## Performance
- Memoize expensive computations with `useMemo`
- Memoize callbacks passed to child components with `useCallback`
- For long lists: always use `FlatList`/`FlashList` — never `ScrollView` with `.map()`
- Provide `keyExtractor` returning a stable unique string (not array index)
- Use `getItemLayout` on FlatList when item height is fixed
- Avoid anonymous functions in JSX — define them outside the render or use `useCallback`
- Use `InteractionManager.runAfterInteractions` for heavy work after navigation transitions

## Native Modules & Turbo Modules
- Prefer Turbo Native Modules (New Architecture) for new native modules — see `TurboDemo` and `turbo-secure-storage` examples
- Always null-check the native module before calling methods
- Bridge methods that return promises — handle rejection explicitly

## Error Handling
- Wrap top-level navigators or screens with an `ErrorBoundary`
- Always handle promise rejections — no floating promises
- Log errors to a monitoring service (Sentry, Bugsnag) in production

## Testing
- Unit test hooks and utility functions with Jest
- Component tests with React Native Testing Library (`@testing-library/react-native`)
- Avoid testing implementation details — test behavior from the user's perspective

## Security
- Never hardcode secrets — use environment variables via `react-native-config` or similar
- For sensitive storage: use `turbo-secure-storage` or Keychain/Keystore — not AsyncStorage
- Root/jailbreak detection for sensitive apps — see `RootDetection` example
- Validate all external inputs before use

## General
- No `console.log` in committed code — use a logger utility that strips in production
- Keep `package.json` dependencies minimal — audit before adding new packages
- Pin dependency versions in production apps (avoid `^` / `~` for native packages)
- Run `pod install` after any native dependency change on iOS
- Use `npx react-native doctor` to verify environment health
