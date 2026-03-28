/**
 * Advanced Interactive Example
 * 
 * This example showcases complex state tracking and auxiliary components.
 * 
 * Key Features:
 * - KeyboardToolbar: Adds a "Done" / Navigation bar above the keyboard 
 *   for easy input switching.
 * - Worklet-based tracking: Uses 'worklet' functions to change UI state 
 *   on the UI thread without bridge lag.
 * - Visual Indicators: An animated bar that changes color based on 
 *   keyboard visibility.
 */

// React & React Native
import React from 'react';
import { Text, TextInput, View } from 'react-native';

// Libraries
import { KeyboardToolbar, KeyboardAwareScrollView, useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// Styles
import { styles } from './styles';

const AdvancedInteractive = () => {
  const keyboardHeight = useSharedValue(0);
  const isKeyboardVisible = useSharedValue(false);

  // Track various stages of keyboard lifecycle
  useKeyboardHandler({
    onStart: (e) => {
      'worklet';
      keyboardHeight.value = e.height;
    },
    onEnd: (e) => {
      'worklet';
      keyboardHeight.value = e.height;
      isKeyboardVisible.value = e.height > 0;
    },
    onMove: (e) => {
      'worklet';
      keyboardHeight.value = e.height;
    },
  }, []);

  // Animated top bar that changes width/color based on keyboard state
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      height: 5,
      backgroundColor: isKeyboardVisible.value ? '#4CAF50' : '#F44336',
      width: '100%',
      transform: [{ scaleX: withTiming(isKeyboardVisible.value ? 1 : 0.5) }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedIndicatorStyle} />
      <KeyboardAwareScrollView
        bottomOffset={62} // Accounts for the height of the toolbar
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Advanced Interaction</Text>
        <Text style={styles.description}>
          This example uses `useKeyboardHandler` to track keyboard state and `KeyboardToolbar` for input navigation.
        </Text>

        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder={`Input field ${i}`}
            placeholderTextColor="#999"
          />
        ))}
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </View>
  );
};

export default AdvancedInteractive;
