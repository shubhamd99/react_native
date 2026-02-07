import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logout } from './slice';
import { RootState } from '../../../store/rootReducer';

const DispatchingActionsComponent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, username, loading, error } = useSelector(
    (state: RootState) => state.dispatchingActions,
  );
  const [inputUsername, setInputUsername] = useState('');

  const handleLogin = () => {
    dispatch(loginRequest(inputUsername));
  };

  const handleLogout = () => {
    dispatch(logout());
    setInputUsername('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispatching Actions Example</Text>
      <Text style={styles.description}>
        This example demonstrates using `put` to dispatch actions (Login Flow).
        Try 'admin' for success, or anything else for failure.
      </Text>

      {!isAuthenticated ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter username (try 'admin')"
            value={inputUsername}
            onChangeText={setInputUsername}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, !inputUsername && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!inputUsername}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Welcome, {username}!</Text>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loader: {
    marginTop: 10,
  },
  successContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  button: {
    backgroundColor: '#007AFF', // iOS blue
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DispatchingActionsComponent;
