import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../NitroScreen.styles';

interface MathCardProps {
  onAdd: () => void;
  onMultiply: () => void;
  result: number | null;
}

export const MathCard: React.FC<MathCardProps> = ({ onAdd, onMultiply, result }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Synchronous Operations</Text>
    <Text style={styles.description}>
      Calls happen directly in the JS thread with zero serialization.
    </Text>
    
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>10 + 25</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onMultiply}>
        <Text style={styles.buttonText}>12 * 8</Text>
      </TouchableOpacity>
    </View>

    {result !== null && (
      <Text style={styles.resultText}>
        Result: <Text style={styles.highlight}>{result}</Text>
      </Text>
    )}
  </View>
);
