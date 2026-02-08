import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { startDownload, cancelDownload, clearLogs } from './slice';

const TaskCancellationComponent = () => {
  const dispatch = useDispatch();
  const { status, progress, logs } = useSelector(
    (state: RootState) => state.taskCancellation,
  );

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleStart = () => {
    dispatch(startDownload());
  };

  const handleCancel = () => {
    dispatch(cancelDownload());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Cancellation</Text>
      <Text style={styles.subtitle}>Demonstrates cleanup logic on cancel</Text>

      <View style={styles.controls}>
        <Text style={styles.statusText}>Status: {status.toUpperCase()}</Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
                backgroundColor:
                  status === 'cancelled'
                    ? 'red'
                    : status === 'completed'
                    ? 'green'
                    : 'blue',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>

        <View style={styles.buttonRow}>
          <Button
            title="Start Download"
            onPress={handleStart}
            disabled={status === 'downloading'}
          />
          <Button
            title="Cancel Download"
            onPress={handleCancel}
            disabled={status !== 'downloading'}
            color="red"
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
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#555',
  },
  statusText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 20,
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

export default TaskCancellationComponent;
