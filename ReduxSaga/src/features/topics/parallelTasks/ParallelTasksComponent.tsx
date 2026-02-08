import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { runSequential, runParallel, clearLogs } from './slice';

const ParallelTasksComponent = () => {
  const dispatch = useDispatch();
  const { status, executionTime, logs } = useSelector(
    (state: RootState) => state.parallelTasks,
  );

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleRunSequential = () => {
    dispatch(runSequential());
  };

  const handleRunParallel = () => {
    dispatch(runParallel());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Running Tasks In Parallel (all)</Text>
      <Text style={styles.subtitle}>Comparison: 2 Tasks x 2000ms each</Text>

      <View style={styles.controls}>
        <View style={styles.buttonRow}>
          <Button
            title="Run Sequential"
            onPress={handleRunSequential}
            disabled={status === 'running'}
          />
          <Button
            title="Run Parallel"
            onPress={handleRunParallel}
            disabled={status === 'running'}
          />
        </View>
        <Text style={styles.statusText}>Status: {status.toUpperCase()}</Text>
        {executionTime && (
          <Text style={styles.resultText}>
            Total Duration: {executionTime}ms
          </Text>
        )}
      </View>

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
        title="Clear Logs"
        onPress={() => dispatch(clearLogs())}
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
  controls: {
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
  statusText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  resultText: {
    textAlign: 'center',
    marginTop: 5,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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

export default ParallelTasksComponent;
