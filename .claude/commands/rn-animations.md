# React Native Animations — Reanimated v3 + Gesture Handler v2

Reanimated is maintained by **Software Mansion** (Callstack ecosystem partner). These two libraries are the standard for production-grade animations in this repo.

## Core Concepts

### Shared Values (run on UI thread)
```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const offset = useSharedValue(0);

// Animate
offset.value = withTiming(100, { duration: 300, easing: Easing.out(Easing.quad) });
offset.value = withSpring(100, { damping: 15, stiffness: 150 });
offset.value = withDelay(200, withTiming(100));
offset.value = withRepeat(withTiming(100), -1, true); // infinite ping-pong
offset.value = withSequence(withTiming(100), withTiming(0));
```

### Animated Styles
```tsx
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
  opacity: opacity.value,
}));

// Use Animated.View (not regular View)
<Animated.View style={[styles.box, animatedStyle]} />
```

### Derived Values
```tsx
import { useDerivedValue } from 'react-native-reanimated';

const double = useDerivedValue(() => offset.value * 2);
```

## Worklets — Rules
- Functions that run on the UI thread must be marked with `'worklet'` directive
- **Never** access React state or JS-thread variables inside a worklet — pass them as shared values
- Call JS-thread functions from worklets using `runOnJS(fn)(args)`

```tsx
// CORRECT
const onEnd = (isActive: boolean) => {
  'worklet';
  if (!isActive) {
    runOnJS(setActive)(false); // call JS-thread setter
  }
};

// WRONG — accessing JS state in worklet causes crash/bugs
const onEnd = () => {
  'worklet';
  setState(false); // ❌ never do this
};
```

## Gesture Handler v2 Integration

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const pan = Gesture.Pan()
  .onUpdate((e) => {
    offsetX.value = startX.value + e.translationX;
    offsetY.value = startY.value + e.translationY;
  })
  .onEnd(() => {
    offsetX.value = withSpring(0);
    offsetY.value = withSpring(0);
  });

const tap = Gesture.Tap()
  .numberOfTaps(2)
  .onEnd(() => {
    runOnJS(handleDoubleTap)();
  });

// Compose gestures
const composed = Gesture.Simultaneous(pan, tap);
// or: Gesture.Race(pan, tap) | Gesture.Exclusive(pan, tap)

<GestureDetector gesture={composed}>
  <Animated.View style={[styles.box, animatedStyle]} />
</GestureDetector>
```

## Common Patterns

### Fade In on Mount
```tsx
const opacity = useSharedValue(0);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 400 });
}, []);

const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
```

### Scale on Press (with Gesture Handler)
```tsx
const scale = useSharedValue(1);

const gesture = Gesture.Tap()
  .onBegin(() => { scale.value = withTiming(0.95); })
  .onFinalize(() => { scale.value = withSpring(1); });

const style = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

### Interpolate Scroll Position
```tsx
import { useAnimatedScrollHandler, interpolate, Extrapolation } from 'react-native-reanimated';

const scrollY = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (e) => {
    scrollY.value = e.contentOffset.y;
  },
});

const headerStyle = useAnimatedStyle(() => ({
  opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolation.CLAMP),
  transform: [{ translateY: interpolate(scrollY.value, [0, 100], [0, -50], Extrapolation.CLAMP) }],
}));

<Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
```

### useAnimatedReaction — React to shared value changes
```tsx
import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';

useAnimatedReaction(
  () => progress.value,
  (current, previous) => {
    if (current >= 1 && previous !== null && previous < 1) {
      runOnJS(onComplete)();
    }
  },
);
```

## Layout Animations (Entering/Exiting)
```tsx
import { FadeIn, FadeOut, SlideInRight, ZoomIn, Layout } from 'react-native-reanimated';

<Animated.View
  entering={FadeIn.duration(300)}
  exiting={FadeOut.duration(200)}
  layout={Layout.springify()}
>
  {/* content */}
</Animated.View>
```

## Lottie vs Rive vs Reanimated — When to use what

| | Lottie | Rive | Reanimated |
|---|---|---|---|
| **Source** | After Effects JSON | Rive editor | Code-defined |
| **Interactivity** | Limited | Rich state machines | Full control |
| **Performance** | Good | Better (lower CPU/GPU) | Best for gestures |
| **Use when** | Designer-made sequences | Interactive state-driven UI | Gesture-driven, scroll-linked |

See `lottieAndRive` project in this repo for a comparison.

## Rules & Anti-patterns

```tsx
// BAD: Animating layout properties without Reanimated (causes JS-thread jank)
const [width, setWidth] = useState(100);
// ...
setWidth(200); // triggers re-render + JS-driven layout

// GOOD: Reanimated shared value
const width = useSharedValue(100);
width.value = withTiming(200);

// BAD: useNativeDriver with Reanimated (Reanimated handles this automatically)
Animated.timing(val, { useNativeDriver: true }); // only for legacy Animated API

// BAD: creating new gesture objects on every render
// Always define gestures at module level or with useMemo
const gesture = Gesture.Pan()...; // if inside component, wrap with useMemo

// GOOD
const gesture = useMemo(() => Gesture.Pan().onUpdate(...), []);
```

## Setup Checklist
- `react-native-reanimated/plugin` must be the **last** Babel plugin
- Wrap app root with `<GestureHandlerRootView style={{ flex: 1 }}>` from gesture-handler
- Enable New Architecture for full Fabric + JSI benefits
