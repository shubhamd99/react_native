# Project: React Native Reference & Learning Hub

A curated collection of independent React Native projects, architectural patterns, and performance-optimized modules. This repository serves as a production-ready reference for advanced React Native development.

## General Instructions
- **Surgical Changes:** Most projects are independent. Do NOT introduce global dependencies unless specifically requested.
- **Native Integration:** Be prepared to modify `android/` and `ios/` folders. This repository emphasizes native-to-JS communication (TurboModules, Codegen).
- **Validation:** Always verify changes by checking both the JS side (TypeScript) and the Native side (Kotlin/Swift).
- **Performance First:** Use `reanimated`, `gesture-handler`, and `FlashList` for high-performance UI. **Do not use the standard React Native Animated API or gesture systems.**
- **Modular Structure:** Maintain a modular file and folder structure. Avoid placing all logic in a single file; follow industry-standard project organization (e.g., separating components, hooks, services, and styles).
- **Contextual Research:** 
  - Always reference the root `README.md` for conceptual grounding (TTI, Threading, Hermes) before suggesting architectural changes.
  - Read module-specific `README.md` files before modifying any sub-project.

## Safety & Research Protocol
- **Research:** **Mandatory Research First.** Always perform a web search to find the latest information, library updates (e.g., React 19, RN 0.76+), and best practices before implementing new features or fixing complex bugs.
- **Latest Tech Mandate:** Always prioritize and use the latest features from React (e.g., Actions, `use` hook, React Compiler) and React Native (e.g., Bridgeless Mode, New Architecture enabled by default) by verifying current documentation via search.
- **Anti-Hallucination:** **Never guess.** If documentation is unclear or a solution is ambiguous, **ask the user for clarification**. Do not hallucinate API signatures or library capabilities.
- **Verification:** Empirically reproduce issues before applying fixes and verify implementations against current official documentation.

## Technical Context
- **Framework:** React Native (Latest stable version, prioritized New Architecture/Bridgeless)
- **Architecture:** New Architecture (Fabric, TurboModules, JSI) prioritized.
- **Pattern:** **Compound Component Pattern** or other advanced architectural patterns for complex UI.
- **State Management:** **Zustand**, **Jotai**, or Redux Toolkit.
- **Styling:** Vanilla CSS, NativeWind (in `NativeWindDLS`).
- **Animation & Gestures:** **Mandatory** use of `react-native-reanimated` and `react-native-gesture-handler`.

## Coding Style
### TypeScript
- **TypeScript only** — no plain `.js` files in source.
- Use `interface` for object shapes, `type` for unions/aliases.
- No `any` types — use proper generics or `unknown`.
- Prefer explicit return types on all exported functions and components.

### Components
- **Functional components only** — no class components.
- **Pattern:** Prefer **Compound Component Pattern** for highly interactive or customizable UI elements.
- Use `React.FC<Props>` or explicit prop typing.
- Keep components in their own files; no multi-component files.
- Prefer named exports over default exports.

### Styling
- **Separate Files:** Always write styles in separate files (e.g., `ComponentName.styles.ts`). Never include styles in the same file as the component logic.
- Use `StyleSheet.create()` by default. No inline style objects in JSX.
- `NativeWindDLS` project uses Tailwind class strings — no `StyleSheet` there.

### Lists & Performance
- **FlashList Mandate:** Always use `@shopify/flash-list`. **Do not use FlatList.**
- Set `keyExtractor` explicitly.
- Optimize with `getItemLayout` (or `estimatedItemSize` for FlashList) for performance.
- Avoid inline `renderItem` arrow functions — define outside component.

### Animations & Gestures
- **Mandatory:** Always use `react-native-reanimated` (v2/v3) and `react-native-gesture-handler`.
- **Forbidden:** **Do not use the built-in React Native `Animated` API or standard gesture responder systems.**
- For layout animations or complex interactions → use `react-native-reanimated` with worklets.
- Postpone heavy work during animations using `InteractionManager.runAfterInteractions()`.

### Storage
- **Never use AsyncStorage for sensitive data** — use `turbo-secure-storage` or MMKV.
- Use `react-native-mmkv` for high-performance, synchronous key-value storage.

## Testing & Reliability
- **Jest & Detox:** Favor Jest for unit testing and Detox for E2E testing.
- **Error Handling:** Implement robust retry logic and offline support for networking modules.
- **Code Quality:**
  - No `console.log` in committed code.
  - No commented-out code blocks.
  - No unused imports or variables.
  - Implement robust loading and error states.

## Project Index (Core References)
| Folder | Concept / Purpose |
|---|---|
| `AbsoluteImports` | Path aliasing with `@app/*` |
| `analytics` | Turbo Module (New Architecture) |
| `mmkv` | JSI Key-Value Storage |
| `mvvm_example` | MVVM Architecture (Reference Only) |
| `ReduxSaga` | Redux + Saga Management |
| `TurboDemo` | TurboModules & Codegen Demo |
| `NativeWindDLS` | Tailwind CSS via NativeWind |
| `widgetApp` | Home screen widget implementation |

---
*Note: This repository is a living reference. When adding new examples, ensure they are well-documented and follow these high standards.*
