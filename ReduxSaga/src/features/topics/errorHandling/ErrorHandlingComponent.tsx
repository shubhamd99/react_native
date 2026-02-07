import React from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { fetchDataRequest, triggerUnhandledError } from './slice';

const ErrorHandlingComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.errorHandling,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error Handling Example</Text>
      <Text style={styles.description}>
        Click the button below to fetch data. The mock API will randomly succeed
        or fail.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.resultContainer}>
          {error && <Text style={styles.error}>Error: {error}</Text>}
          {data && <Text style={styles.success}>Success: {data}</Text>}
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
          loading ? styles.buttonDisabled : null,
        ]}
        onPress={() => dispatch(fetchDataRequest())}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Fetch Data</Text>
      </Pressable>

      <View style={styles.spacer} />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.errorButton,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => dispatch(triggerUnhandledError())}
      >
        <Text style={styles.buttonText}>
          Trigger Unhandled Error (Check Console)
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  spacer: {
    height: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  resultContainer: {
    marginBottom: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF', // iOS blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2, // Android shadow
  },
  errorButton: {
    backgroundColor: '#FF3B30', // iOS red
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ErrorHandlingComponent;
