import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { storage } from '../utils/storage';
import { MMKVButton } from './MMKVButton';

interface GlobalOperationsProps {
  onLog: (message: string) => void;
}

export const GlobalOperations: React.FC<GlobalOperationsProps> = ({
  onLog,
}) => {
  const handleGetAllKeys = () => {
    const keys = storage.getAllKeys();
    onLog(`All keys: ${JSON.stringify(keys)}`);
  };

  const handleClearAll = () => {
    storage.clearAll();
    onLog('Cleared all storage');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Global Operations</Text>
      <View style={styles.row}>
        <MMKVButton title="Get All Keys" onPress={handleGetAllKeys} />
        <MMKVButton
          title="Clear All"
          onPress={handleClearAll}
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
