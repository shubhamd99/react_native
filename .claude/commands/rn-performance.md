# React Native Performance Audit

Analyze the given code or file for React Native performance issues and fix them.

## What to check

### Re-render Issues
- [ ] Inline object/array/function props that create new references on every render
  - `style={{ flex: 1 }}` → move to `StyleSheet.create()`
  - `onPress={() => doSomething()}` → use `useCallback`
  - `data={[1, 2, 3]}` → move to `useMemo` or module-level constant
- [ ] Missing `memo()` on pure child components that receive stable props
- [ ] Context values that aren't memoized (causes all consumers to re-render)
- [ ] State updates that don't change value but still trigger re-renders

### List Performance
- [ ] `ScrollView` with `.map()` used instead of `FlatList` or `FlashList`
- [ ] Missing `keyExtractor` or using array index as key
- [ ] Missing `getItemLayout` when item height is uniform
- [ ] Heavy `renderItem` not wrapped in `memo` or `useCallback`
- [ ] `initialNumToRender` not set appropriately
- [ ] `windowSize` not tuned for the dataset size
- [ ] `removeClippedSubviews` not enabled for long lists on Android

### Animation
- [ ] Animations not using `useNativeDriver: true` (causes JS-thread jank)
- [ ] Reanimated worklets accidentally accessing JS-thread values
- [ ] Heavy computations inside animated callbacks on the JS thread

### Image Handling
- [ ] Missing `width`/`height` on Image (causes layout recalculation)
- [ ] No caching strategy (use `react-native-fast-image`)
- [ ] Loading full-resolution images for thumbnails (resize on server/CDN)

### Bundle & Startup
- [ ] Large synchronous imports in the app entry (use dynamic `import()`)
- [ ] Heavy work in component module scope (runs at import time)
- [ ] Too many navigation screens mounted eagerly

### JavaScript Thread
- [ ] Heavy synchronous operations on the JS thread (JSON parsing, sorting large arrays)
  - Move to background thread using `InteractionManager` or a native module
- [ ] `setInterval` / `setTimeout` not cleared on unmount (memory leak + wasted cycles)
- [ ] Event listeners not removed on unmount

### Hermes / New Architecture
- [ ] Not using Hermes engine (check `android/app/build.gradle` `enableHermes`)
- [ ] Old Architecture bridges that could be replaced with Turbo Modules / Fabric

## How to report

For each issue found, output:
```
ISSUE: <short description>
FILE: <path>:<line>
SEVERITY: High | Medium | Low
FIX: <what to change>
```

Then apply the fixes directly to the code.

## Common quick wins

```tsx
// Before: inline style (new object every render)
<View style={{ flex: 1, padding: 16 }} />

// After: StyleSheet
const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
<View style={styles.container} />

// Before: inline callback
<Button onPress={() => handlePress(item.id)} />

// After: useCallback
const handlePress = useCallback(() => handlePressItem(item.id), [item.id]);
<Button onPress={handlePress} />

// Before: ScrollView list
<ScrollView>{items.map(item => <Row key={item.id} item={item} />)}</ScrollView>

// After: FlatList
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Row item={item} />}
/>
```
