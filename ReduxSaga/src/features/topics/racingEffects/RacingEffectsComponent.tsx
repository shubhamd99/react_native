import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import {
  fetchFast,
  fetchSlow,
  startSync,
  cancelSync,
  clearLogs,
} from './slice';

const RacingEffectsComponent = () => {
  const dispatch = useDispatch();
  const { data, status, syncStatus, logs, error } = useSelector(
    (state: RootState) => state.racingEffects,
  );

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleFetchFast = () => {
    dispatch(fetchFast());
  };

  const handleFetchSlow = () => {
    dispatch(fetchSlow());
  };

  const handleStartSync = () => {
    dispatch(startSync());
  };

  const handleCancelSync = () => {
    dispatch(cancelSync());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Racing Effects (Timeouts & Cancellation)</Text>

      {/* Timeout Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Timeout Race (Fetch vs 1s Timeout)</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Fetch Fast (0.5s)"
            onPress={handleFetchFast}
            disabled={status === 'fetching'}
          />
          <Button
            title="Fetch Slow (2s)"
            onPress={handleFetchSlow}
            disabled={status === 'fetching'}
            color="orange"
          />
        </View>
        <Text style={styles.result}>
          Result:{' '}
          {status === 'fetching'
            ? 'Loading...'
            : status === 'success'
            ? data
            : status === 'timeout'
            ? 'Timed Out!'
            : status === 'failure'
            ? `Error: ${error}`
            : 'Idle'}
        </Text>
      </View>

      {/* Background Task Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Task Cancellation Race</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Start Sync"
            onPress={handleStartSync}
            disabled={syncStatus === 'running'}
          />
          <Button
            title="Cancel Sync"
            onPress={handleCancelSync}
            disabled={syncStatus === 'stopped'}
            color="red"
          />
        </View>
        <Text style={styles.result}>
          Sync Status: {syncStatus.toUpperCase()}
        </Text>
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  result: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
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

export default RacingEffectsComponent;
