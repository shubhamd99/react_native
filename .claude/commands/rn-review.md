# React Native Code Review

Perform a thorough code review of the specified file or diff, covering correctness, performance, maintainability, and React Native-specific concerns.

## Review Checklist

### Correctness
- [ ] Logic is correct — no off-by-one errors, incorrect conditions, wrong async handling
- [ ] All promise rejections are handled (no floating promises)
- [ ] No missing dependency in `useEffect` / `useCallback` / `useMemo` dependency arrays
- [ ] No stale closures capturing old state/props
- [ ] Cleanup returned from `useEffect` where necessary (timers, subscriptions, event listeners)
- [ ] No race conditions in async operations (use abort controllers or flags)

### React Native Specifics
- [ ] No `ScrollView` used for long/dynamic lists — should be `FlatList` or `FlashList`
- [ ] Keyboard avoidance handled for forms (`KeyboardAvoidingView` + `ScrollView`)
- [ ] `SafeAreaView` used for screen-level components
- [ ] Platform differences handled with `Platform.OS` or `Platform.select()` where needed
- [ ] No hardcoded pixel values that break across screen densities — use `StyleSheet` units or responsive helpers
- [ ] `useNativeDriver: true` on all animations that support it
- [ ] Back handler registered/unregistered correctly on Android

### Performance
- [ ] No inline style objects or arrow functions passed as props to frequently rendering components
- [ ] `memo`, `useCallback`, `useMemo` used correctly (not over-used, not under-used)
- [ ] Heavy computations not running on every render
- [ ] List components configured with `keyExtractor`, `getItemLayout` if applicable

### TypeScript
- [ ] No `any` without a justification comment
- [ ] Props interface is complete and accurate
- [ ] Return types are explicit on public functions and hooks
- [ ] No type assertions (`as Foo`) without a guard or comment

### Security
- [ ] No secrets, tokens, or PII in source code or logs
- [ ] User inputs validated/sanitized before use
- [ ] Secure storage used for sensitive data (not AsyncStorage)
- [ ] No `eval()` or dynamic code execution

### Code Quality
- [ ] Component is not too large (> 150 lines is a smell — consider splitting)
- [ ] No dead code, unused imports, or commented-out code
- [ ] No `console.log` statements
- [ ] Error states and loading states handled in the UI
- [ ] Meaningful variable/function names

### Accessibility
- [ ] Interactive elements have `accessibilityLabel` / `accessibilityRole`
- [ ] Touchable targets are at least 44x44pt
- [ ] Color contrast meets WCAG AA for text

## Output Format

Organize findings into:

**Critical** — Must fix before merging (bugs, security issues, crashes)
**Major** — Should fix (performance, bad patterns, missing error handling)
**Minor** — Nice to fix (style, naming, minor improvements)
**Praise** — What was done well (always include at least one)

For each finding:
```
[SEVERITY] Short title
File: path/to/file.tsx:line
Issue: What is wrong
Fix: What to do instead
```

After the review, ask: "Do you want me to apply any of these fixes?"
