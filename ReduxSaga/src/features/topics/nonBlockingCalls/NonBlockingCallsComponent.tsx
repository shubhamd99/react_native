import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { loginRequest, logout, clearLogs } from './slice';

const NonBlockingCallsComponent = () => {
  const dispatch = useDispatch();
  const { status, logs } = useSelector(
    (state: RootState) => state.nonBlockingCalls,
  );

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginRequest('user_nbc'));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Non-Blocking Calls (Fork/Cancel)</Text>
      <Text style={styles.subtitle}>
        Login takes 3 seconds. Try logging out *before* it finishes!
      </Text>

      <View style={styles.controls}>
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text
            style={[
              styles.value,
              status === 'logged_in'
                ? styles.success
                : status === 'cancelled'
                ? styles.cancelled
                : null,
            ]}
          >
            {status.toUpperCase()}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="Login (3s delay)"
            onPress={handleLogin}
            disabled={status === 'loading' || status === 'logged_in'}
          />
          <Button
            title="Logout / Cancel"
            onPress={handleLogout}
            color="red"
            disabled={status === 'logged_out' || status === 'cancelled'}
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
  controls: {
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
  },
  cancelled: {
    color: 'orange',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default NonBlockingCallsComponent;
