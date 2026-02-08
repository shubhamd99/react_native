import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { startDemo, stopDemo, crashTask, clearLogs } from './slice';

const RootSagaPatternsComponent = () => {
  const dispatch = useDispatch();
  const { taskAStatus, taskBStatus, activeDemo, logs } = useSelector(
    (state: RootState) => state.rootSagaPatterns,
  );

  useEffect(() => {
    return () => {
      dispatch(stopDemo());
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleStartFragile = () => {
    dispatch(startDemo('fragile'));
  };

  const handleStartResilient = () => {
    dispatch(startDemo('resilient'));
  };

  const handleStop = () => {
    dispatch(stopDemo());
  };

  const handleCrashA = () => {
    dispatch(crashTask('A'));
  };

  const handleCrashB = () => {
    dispatch(crashTask('B'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Root Saga Patterns (All vs Spawn)</Text>

      <View style={styles.controls}>
        <Text style={styles.subtitle}>Select Mode:</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Fragile (all)"
            onPress={handleStartFragile}
            disabled={activeDemo !== 'none'}
          />
          <Button
            title="Resilient (spawn)"
            onPress={handleStartResilient}
            disabled={activeDemo !== 'none'}
          />
          <Button
            title="Stop Demo"
            onPress={handleStop}
            disabled={activeDemo === 'none'}
            color="red"
          />
        </View>
        <Text style={styles.statusText}>
          Current Mode: {activeDemo.toUpperCase()}
        </Text>
      </View>

      <View style={styles.tasksContainer}>
        <View
          style={[
            styles.taskCard,
            taskAStatus === 'crashed'
              ? styles.crashed
              : taskAStatus === 'running'
              ? styles.running
              : null,
          ]}
        >
          <Text style={styles.taskTitle}>Task A</Text>
          <Text>Status: {taskAStatus.toUpperCase()}</Text>
          <Button
            title="Crash A"
            onPress={handleCrashA}
            disabled={taskAStatus !== 'running'}
            color="orange"
          />
        </View>

        <View
          style={[
            styles.taskCard,
            taskBStatus === 'crashed'
              ? styles.crashed
              : taskBStatus === 'running'
              ? styles.running
              : null,
          ]}
        >
          <Text style={styles.taskTitle}>Task B</Text>
          <Text>Status: {taskBStatus.toUpperCase()}</Text>
          <Button
            title="Crash B"
            onPress={handleCrashB}
            disabled={taskBStatus !== 'running'}
            color="orange"
          />
        </View>
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  statusText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tasksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskCard: {
    width: '48%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  running: {
    borderColor: 'green',
    backgroundColor: '#e6ffe6',
  },
  crashed: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  taskTitle: {
    fontWeight: 'bold',
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

export default RootSagaPatternsComponent;
