import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { storage } from '../utils/storage';
import { MMKVButton } from './MMKVButton';

interface BasicOperationsProps {
  onLog: (message: string) => void;
}

export const BasicOperations: React.FC<BasicOperationsProps> = ({ onLog }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSet = () => {
    if (!key) return Alert.alert('Error', 'Key is required');
    storage.set(key, value);
    onLog(`Set: ${key} = ${value}`);
  };

  const handleGet = () => {
    if (!key) return Alert.alert('Error', 'Key is required');
    const hasKey = storage.contains(key);
    if (hasKey) {
      const storedValue = storage.getString(key);
      onLog(`Get: ${key} = ${storedValue}`);
    } else {
      onLog(`Get: ${key} not found`);
    }
  };

  const handleDelete = () => {
    if (!key) return Alert.alert('Error', 'Key is required');
    storage.remove(key);
    onLog(`Deleted: ${key}`);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Basic Operations</Text>
      <TextInput
        style={styles.input}
        placeholder="Key"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.row}>
        <MMKVButton title="Set (String)" onPress={handleSet} />
        <MMKVButton title="Get (String)" onPress={handleGet} />
        <MMKVButton
          title="Delete"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 5,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
});
