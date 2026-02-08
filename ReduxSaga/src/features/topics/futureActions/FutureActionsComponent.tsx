import React from 'react';
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
  loginRequest,
  logout,
  startLogger,
  stopLogger,
  triggerClick,
  clearLogs,
} from './slice';

const FutureActionsComponent = () => {
  const dispatch = useDispatch();
  const { user, status, error, logs, congratulationMessage, isLoggerRunning } =
    useSelector((state: RootState) => state.futureActions);

  const [username, setUsername] = React.useState('user123');

  const handleLogin = () => {
    dispatch(loginRequest(username));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Future Actions (Pull Model)</Text>

      {/* Login Flow Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Login Flow (Control Flow)</Text>
        {status === 'logged_out' && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
        )}

        {status === 'loading' && (
          <Text style={styles.status}>Logging in...</Text>
        )}

        {status === 'logged_in' && (
          <View style={styles.loggedInContainer}>
            <Text style={styles.status}>Welcome, {user}!</Text>
            <Button title="Logout" onPress={handleLogout} color="red" />
          </View>
        )}

        {error && <Text style={styles.error}>Error: {error}</Text>}
      </View>

      {/* Logger Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Action Logger (Background Task)</Text>
        <View style={styles.buttonRow}>
          <Button
            title={isLoggerRunning ? 'Stop Logger' : 'Start Logger'}
            onPress={() =>
              isLoggerRunning ? dispatch(stopLogger()) : dispatch(startLogger())
            }
            color={isLoggerRunning ? 'orange' : 'blue'}
          />
          <Button
            title="Clear Logs"
            onPress={() => dispatch(clearLogs())}
            color="gray"
          />
        </View>
        <ScrollView style={styles.logsContainer}>
          {logs.length === 0 ? (
            <Text style={styles.logText}>No logs yet...</Text>
          ) : null}
          {logs.map((log: string, index: number) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>

      {/* Counter Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>First 3 Clicks (One-off Task)</Text>
        <Button
          title="Trigger Event"
          onPress={() => dispatch(triggerClick())}
        />
        {congratulationMessage && (
          <Text style={styles.congrats}>{congratulationMessage}</Text>
        )}
      </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  loggedInContainer: {
    gap: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  logsContainer: {
    maxHeight: 100,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 4,
  },
  logText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  congrats: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FutureActionsComponent;
