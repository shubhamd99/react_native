/**
 * Basic Example
 * 
 * This example demonstrates the standard components provided by 
 * react-native-keyboard-controller for automatic layout management.
 * 
 * Key Components:
 * - KeyboardAvoidingView: A drop-in replacement for the standard RN component 
 *   that performs much better on Android (no jumping).
 * - KeyboardAwareScrollView: Automatically handles scrolling to focused inputs
 *   without any extra configuration.
 */

// React & React Native
import React from 'react';
import { Text, TextInput, View } from 'react-native';

// Libraries
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Styles
import { styles } from './styles';

const Basic = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Basic Keyboard Controller</Text>
        <View style={styles.spacer} />
        <TextInput
          style={styles.input}
          placeholder="Type something here..."
          placeholderTextColor="#999"
        />
        <View style={styles.spacer} />
        <TextInput
          style={styles.input}
          placeholder="Another input down here..."
          placeholderTextColor="#999"
        />
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default Basic;
