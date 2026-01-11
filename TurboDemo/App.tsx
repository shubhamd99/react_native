import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NativeMath from './src/NativeMath';

export default function App() {
  const result = NativeMath.multiply(6, 7);

  return (
    <View style={styles.container}>
      <Text>Result from Native: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});
