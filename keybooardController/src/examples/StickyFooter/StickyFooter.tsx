/**
 * Sticky Footer Example
 * 
 * This example demonstrates advanced animation techniques using 
 * Reanimated 4 and the Keyboard Controller's handler system.
 * 
 * Key Concepts:
 * - useKeyboardHandler: Listens to real-time keyboard position events.
 * - useSharedValue: Stores the keyboard height for performant animations.
 * - Sticky behavior: The footer "sticks" to the top of the keyboard 
 *   as it slides up, creating a professional, fluid UI.
 */

// React & React Native
import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

// Libraries
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useKeyboardHandler } from 'react-native-keyboard-controller';

// Styles
import { styles } from './styles';

const StickyFooter = () => {
  const height = useSharedValue(0);

  // Hook to track keyboard movements in real-time
  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      height.value = e.height;
    },
    onEnd: (e) => {
      'worklet';
      height.value = e.height;
    },
  }, []);

  // Animate the footer position based on keyboard height
  const footerStyle = useAnimatedStyle(() => {
    return {
      // height is negative when keyboard is up in this library's event system
      transform: [{ translateY: height.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sticky Footer Example</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="#999"
        />
        <View style={{ flex: 1 }} />
      </View>

      <Animated.View style={[styles.footer, footerStyle]}>
        <Button title="Sticky Action Button" onPress={() => {}} />
      </Animated.View>
    </View>
  );
};

export default StickyFooter;
