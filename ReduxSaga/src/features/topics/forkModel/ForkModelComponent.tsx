import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { startAttachedFork, startDetachedFork, clearLogs } from './slice';

const ForkModelComponent = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.forkModel.logs);

  useEffect(() => {
    return () => {
      dispatch(clearLogs());
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fork Model (fork vs spawn)</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Attached Fork"
          onPress={() => dispatch(startAttachedFork())}
        />
        <Button
          title="Start Detached Fork"
          onPress={() => dispatch(startDetachedFork())}
        />
        <Button
          title="Clear Logs"
          onPress={() => dispatch(clearLogs())}
          color="red"
        />
      </View>
      <ScrollView style={styles.logsContainer}>
        {logs.map((log: string, index: number) => (
          <Text key={index} style={styles.logText}>
            {log}
          </Text>
        ))}
      </ScrollView>
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
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  logsContainer: {
    maxHeight: 200,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  logText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ForkModelComponent;
