# Project: React Native Reference & Learning Hub

A curated collection of independent React Native projects, architectural patterns, and performance-optimized modules. This repository serves as a production-ready reference for advanced React Native development.

## General Instructions

- **Surgical Changes:** Most projects are independent. Do NOT introduce global dependencies unless specifically requested.
- **Native Integration:** Be prepared to modify `android/` and `ios/` folders. This repository emphasizes native-to-JS communication (TurboModules, Codegen).
- **Validation:** Always verify changes by checking both the JS side (TypeScript) and the Native side (Kotlin/Swift).
- **16KB Page Size Support:**
  - For Android native modules, ALWAYS include support for 16KB page alignment to ensure compatibility with Android 15+ devices.
- **Performance First:** Use `reanimated`, `gesture-handler`, and `FlashList` for high-performance UI. **Do not use the standard React Native Animated API or gesture systems.**
- **Modular Structure:** Maintain a modular file and folder structure. Avoid placing all logic in a single file; follow industry-standard project organization (e.g., separating components, hooks, services, and styles).
- **Comprehensive Documentation:**
  - **Code Comments:** ALWAYS include descriptive comments in your code to explain complex logic, architectural decisions, and library-specific implementations for better maintainability and understanding.
  - **Project READMEs:** ALWAYS update or create project-level `README.md` files with comprehensive details about the project's purpose, libraries used (with versions), architecture, and usage examples. Documentation must be kept in sync with code changes.
- **Contextual Research:**
  - Always reference the root `README.md` for conceptual grounding (TTI, Threading, Hermes) before suggesting architectural changes.
  - Read module-specific `README.md` files before modifying any sub-project.

## Safety & Research Protocol

- **Library Documentation:** **Mandatory Doc Review.** ALWAYS use `context7` or web search before using any library to deeply understand its usage, implementation details, and dependencies. Never rely on training data for library APIs or architectural patterns.
- **Research:** **Mandatory Research First.** Always perform a web search to find the latest information, library updates (e.g., React 19, RN 0.76+), and best practices before implementing new features or fixing complex bugs.
- **Latest Tech Mandate:** Always prioritize and use the latest features from React (e.g., Actions, `use` hook, React Compiler) and React Native (e.g., Bridgeless Mode, New Architecture enabled by default) by verifying current documentation via search.
- **Package Versions:** ALWAYS perform a web search to find the latest stable versions of libraries before adding or updating them in `package.json`. **Never guess package versions or rely on outdated training data.**
- **Anti-Hallucination:** **Never guess.** If documentation is unclear or a solution is ambiguous, **ask the user for clarification**. Do not hallucinate API signatures or library capabilities.
- **Verification:** Empirically reproduce issues before applying fixes and verify implementations against current official documentation.

## Technical Context

- **Framework:** React Native (Latest stable version, prioritized New Architecture/Bridgeless)
- **Architecture:** New Architecture (Fabric, TurboModules, JSI) prioritized.
- **Pattern:** **Compound Component Pattern** or other advanced architectural patterns for complex UI.
- **State Management:** **Zustand**, **Jotai**, or Redux Toolkit.
- **Styling:** Vanilla CSS, NativeWind (in `NativeWindDLS`).
- **Animation & Gestures:** **Mandatory** use of `react-native-reanimated` and `react-native-gesture-handler`.

## Environment & Pre-installed Tools

The following core Ubuntu packages are pre-installed in this environment. Use these CLI tools whenever possible for faster and more efficient operations:

- **Poppler-utils:** (`pdftotext`, etc.) For PDF text extraction.
- **Pandoc:** For advanced document format conversion.
- **ImageMagick:** For image manipulation and preprocessing.
- **Tesseract OCR:** (`tesseract-ocr`, `tesseract-ocr-eng`) For reading text from images and scanned PDFs.
- **LibreOffice:** For converting Word/Excel files to PDF or CSV via CLI.
- **jq:** For high-performance JSON parsing and manipulation.
- **yq:** (mikefarah/yq) The industry-standard YAML/XML/CSV/Properties processor.

## Coding Style

### TypeScript

- **TypeScript only** — no plain `.js` files in source.
- Use `interface` for object shapes, `type` for unions/aliases.
- **Strict Typing Mandate:**
  - **NO `any` types.** The use of `any` is strictly forbidden.
  - Use proper **generics** or `unknown` for dynamic values.
  - If a library has strict constraint issues (like Nitro), resolve them using architectural patterns (e.g., proper inheritance) rather than type casting to `any`.
- Prefer explicit return types on all exported functions and components.

### Components

- **Functional components only** — no class components.
- **Pattern:** Prefer **Compound Component Pattern** for highly interactive or customizable UI elements.
- **Modular Pattern Mandate:**
  - **Hooks for Logic:** All business logic, state management, and side effects MUST be placed in custom hooks (e.g., `useMyFeature.ts`).
  - **Small Components:** Large screens MUST be broken down into small, focused sub-components (placed in a `components/` directory).
  - **Prop Typing:** Use `React.FC<Props>` or explicit prop typing.
  - **No Monolithic Files:** Keep components in their own files; no multi-component files.
  - Prefer named exports over default exports.

### Styling

- **Separate Files:** Always write styles in separate files (e.g., `ComponentName.styles.ts`). Never include styles in the same file as the component logic.
- Use `StyleSheet.create()` by default. No inline style objects in JSX.
- `NativeWindDLS` project uses Tailwind class strings — no `StyleSheet` there.

### Safe Areas

- **SafeAreaView Mandate:** ALWAYS use `SafeAreaView` from `react-native-safe-area-context`.
- **FORBIDDEN:** NEVER use the built-in `SafeAreaView` from `react-native` as it is deprecated and inconsistent across platforms.
- Wrap the root of the app in `SafeAreaProvider`.

### Lists & Performance

- **FlashList Mandate:** Always use `@shopify/flash-list`. **Do not use FlatList.**
- Set `keyExtractor` explicitly.
- For FlashList v2, do not use `estimatedItemSize` as sizing is handled automatically.
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

| Folder                    | Concept / Purpose                  |
| ------------------------- | ---------------------------------- |
| `AbsoluteImports`         | Path aliasing with `@app/*`        |
| `analytics`               | Turbo Module (New Architecture)    |
| `InfiniteScrollFlashList` | Generic Infinite Scroll Pagination |
| `mmkv`                    | JSI Key-Value Storage              |
| `mvvm_example`            | MVVM Architecture (Reference Only) |
| `ReduxSaga`               | Redux + Saga Management            |
| `TurboDemo`               | TurboModules & Codegen Demo        |
| `NativeWindDLS`           | Tailwind CSS via NativeWind        |
| `widgetApp`               | Home screen widget implementation  |

---

_Note: This repository is a living reference. When adding new examples, ensure they are well-documented and follow these high standards._
