import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { storage } from '../utils/storage';
import { BasicOperations } from '../components/BasicOperations';
import { TypedOperations } from '../components/TypedOperations';
import { GlobalOperations } from '../components/GlobalOperations';
import { AdvancedOperations } from '../components/AdvancedOperations';
import { HooksDemo } from '../components/HooksDemo';
import { LogViewer } from '../components/LogViewer';

export const MMKVDemo = () => {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey: string) => {
      const newValue = storage.getString(changedKey);
      addLog(`Listener: Key "${changedKey}" changed to "${newValue}"`);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const addLog = (message: string) => {
    setLog(prev => [message, ...prev]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>MMKV Demo</Text>

      <BasicOperations onLog={addLog} />
      <TypedOperations onLog={addLog} />
      <GlobalOperations onLog={addLog} />
      <AdvancedOperations onLog={addLog} />
      <HooksDemo />
      <LogViewer logs={log} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
