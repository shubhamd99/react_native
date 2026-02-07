import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import {
  incrementEveryAsync,
  incrementLatestAsync,
  incrementLeadingAsync,
  incrementThrottledAsync,
} from './slice';

const SagaHelpersComponent = () => {
  const dispatch = useDispatch();
  const { everyCount, latestCount, leadingCount, throttledCount } = useSelector(
    (state: RootState) => state.sagaHelpers,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saga Helpers</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>takeEvery</Text>
        <Text style={styles.description}>
          Allows multiple tasks to run concurrently. rapid clicks = multiple
          increments.
        </Text>
        <Text style={styles.count}>Count: {everyCount}</Text>
        <Button
          title="Increment Every (1s delay)"
          onPress={() => dispatch(incrementEveryAsync())}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>takeLatest</Text>
        <Text style={styles.description}>
          Cancels any previous running task. rapid clicks = only last one
          completes.
        </Text>
        <Text style={styles.count}>Count: {latestCount}</Text>
        <Button
          title="Increment Latest (1s delay)"
          onPress={() => dispatch(incrementLatestAsync())}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>takeLeading</Text>
        <Text style={styles.description}>
          Ignores actions while a task is running. rapid clicks = only first one
          completes until finished.
        </Text>
        <Text style={styles.count}>Count: {leadingCount}</Text>
        <Button
          title="Increment Leading (1s delay)"
          onPress={() => dispatch(incrementLeadingAsync())}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>throttle</Text>
        <Text style={styles.description}>
          Limits actions to once per 2s. rapid clicks = limited increments.
        </Text>
        <Text style={styles.count}>Count: {throttledCount}</Text>
        <Button
          title="Increment Throttled (2s limit)"
          onPress={() => dispatch(incrementThrottledAsync())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e6f7ff',
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  count: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SagaHelpersComponent;
