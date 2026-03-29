import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../NitroScreen.styles';

interface AsyncCardProps {
  onRun: () => void;
  result: string | null;
  isLoading: boolean;
}

export const AsyncCard: React.FC<AsyncCardProps> = ({ onRun, result, isLoading }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Asynchronous Operations</Text>
    <Text style={styles.description}>
      Nitro automatically handles bridge-less Promises.
    </Text>
    
    <TouchableOpacity 
      style={[styles.button, styles.asyncButton]} 
      onPress={onRun}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>Run Async Task (1.5s)</Text>
      )}
    </TouchableOpacity>

    {result && (
      <Text style={styles.resultText}>{result}</Text>
    )}
  </View>
);
