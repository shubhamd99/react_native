import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import {
  triggerThrottle,
  triggerDebounce,
  triggerRetry,
  clearLogs,
} from './slice';

const RecipesComponent = () => {
  const dispatch = useDispatch();
  const {
    throttleCount,
    throttleExecutions,
    debounceExecutions,
    retryStatus,
    retryAttempt,
    logs,
  } = useSelector((state: RootState) => state.recipes);

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleThrottleClick = () => {
    dispatch(triggerThrottle());
  };

  const handleDebounceChange = (text: string) => {
    setInputText(text);
    dispatch(triggerDebounce(text));
  };

  const handleRetryClick = () => {
    dispatch(triggerRetry());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saga Recipes</Text>
      <Text style={styles.subtitle}>Common Patterns</Text>

      {/* Throttle Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Throttling (1s)</Text>
        <Text style={styles.description}>
          Limits execution rate. Click rapidly.
        </Text>
        <Button
          title={`Click Me! (${throttleCount})`}
          onPress={handleThrottleClick}
        />
        <Text style={styles.resultText}>
          Actual Saga Executions: {throttleExecutions}
        </Text>
      </View>

      {/* Debounce Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Debouncing (500ms)</Text>
        <Text style={styles.description}>Delays until typing stops.</Text>
        <TextInput
          style={styles.input}
          placeholder="Type to search..."
          value={inputText}
          onChangeText={handleDebounceChange}
        />
        <Text style={styles.resultText}>
          Last Processed:{' '}
          {debounceExecutions.length > 0
            ? debounceExecutions[debounceExecutions.length - 1]
            : '-'}
        </Text>
      </View>

      {/* Retry Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Retrying (3 Attempts)</Text>
        <Text style={styles.description}>
          Automatically retries failed calls.
        </Text>
        <Button
          title="Fetch Unreliable Data"
          onPress={handleRetryClick}
          disabled={retryStatus === 'trying'}
        />
        <Text style={styles.resultText}>
          Status: {retryStatus.toUpperCase()}
          {retryStatus === 'trying' && ` (Attempt ${retryAttempt})`}
        </Text>
      </View>

      {/* Logs */}
      <Text style={styles.sectionTitle}>Logs</Text>
      <ScrollView style={styles.logsContainer}>
        {logs.length === 0 ? (
          <Text style={styles.logText}>Logs will appear here...</Text>
        ) : null}
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>
            {log}
          </Text>
        ))}
      </ScrollView>

      <Button
        title="Clear Logs & Reset"
        onPress={() => {
          dispatch(clearLogs());
          setInputText('');
        }}
        color="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  resultText: {
    textAlign: 'center',
    marginTop: 5,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  logsContainer: {
    height: 150,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logText: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});

export default RecipesComponent;
