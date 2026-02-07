import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import {
  requestAction,
  startCountdown,
  stopCountdown,
  broadcastAction,
} from './slice';

const ChannelsComponent = () => {
  const dispatch = useDispatch();
  const {
    processedRequests,
    countdown,
    isCountdownRunning,
    workerACount,
    workerBCount,
  } = useSelector((state: RootState) => state.channels);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redux Saga Channels</Text>

      {/* Action Channel Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Action Channel (Queue)</Text>
        <Text style={styles.description}>
          Requests are processed sequentially (1s delay).
        </Text>
        <Text style={styles.stat}>Processed Requests: {processedRequests}</Text>
        <Button
          title="Queue Request"
          onPress={() => dispatch(requestAction())}
        />
      </View>

      {/* Event Channel Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Event Channel (Countdown)</Text>
        <Text style={styles.description}>
          Countdown driven by an external interval source.
        </Text>
        <Text style={styles.stat}>Countdown: {countdown}</Text>
        <Button
          title={isCountdownRunning ? 'Stop Countdown' : 'Start Countdown'}
          onPress={() =>
            isCountdownRunning
              ? dispatch(stopCountdown())
              : dispatch(startCountdown())
          }
          color={isCountdownRunning ? 'red' : '#2196F3'}
        />
      </View>

      {/* Multicast Channel Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Multicast Channel (Broadcast)</Text>
        <Text style={styles.description}>
          One action broadcast to multiple workers.
        </Text>
        <View style={styles.row}>
          <Text style={styles.stat}>Worker A: {workerACount}</Text>
          <Text style={styles.stat}>Worker B: {workerBCount}</Text>
        </View>
        <Button
          title="Broadcast Action"
          onPress={() => dispatch(broadcastAction())}
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  stat: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ChannelsComponent;
