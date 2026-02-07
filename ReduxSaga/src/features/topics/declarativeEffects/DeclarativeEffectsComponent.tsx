import React from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from './slice';
import { RootState } from '../../../store/rootReducer';

const DeclarativeEffectsComponent = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.declarativeEffects,
  );

  const handleFetchUser = () => {
    dispatch(fetchUserRequest('1'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Declarative Effects Example</Text>
      <Text style={styles.description}>
        This example demonstrates using `call` to invoke asynchronous functions
        declaratively.
      </Text>

      <Button title="Fetch User (ID: 1)" onPress={handleFetchUser} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {user && (
        <View style={styles.result}>
          <Text>User ID: {user.id}</Text>
          <Text>Name: {user.name}</Text>
        </View>
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
  loader: {
    marginTop: 10,
  },
  result: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 5,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

export default DeclarativeEffectsComponent;
