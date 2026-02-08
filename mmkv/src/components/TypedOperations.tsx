import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { storage } from '../utils/storage';
import { MMKVButton } from './MMKVButton';

interface TypedOperationsProps {
  onLog: (message: string) => void;
}

export const TypedOperations: React.FC<TypedOperationsProps> = ({ onLog }) => {
  const handleSetNumber = () => {
    storage.set('myNumber', 123.456);
    onLog('Set myNumber = 123.456');
  };

  const handleGetNumber = () => {
    const val = storage.getNumber('myNumber');
    onLog(`Get myNumber = ${val}`);
  };

  const handleSetBoolean = () => {
    storage.set('myBool', true);
    onLog('Set myBool = true');
  };

  const handleGetBoolean = () => {
    const val = storage.getBoolean('myBool');
    onLog(`Get myBool = ${val}`);
  };

  const handleSetObject = () => {
    const user = { name: 'John', age: 30 };
    storage.set('user', JSON.stringify(user));
    onLog('Set user = { name: "John", age: 30 }');
  };

  const handleGetObject = () => {
    const jsonUser = storage.getString('user');
    let userObject;
    if (jsonUser) {
      try {
        userObject = JSON.parse(jsonUser);
        onLog(`Get user = ${JSON.stringify(userObject)}`);
      } catch {
        onLog(`Error parsing user object`);
      }
    } else {
      onLog(`User object not found`);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Typed Operations</Text>
      <View style={styles.row}>
        <MMKVButton title="Set Number" onPress={handleSetNumber} />
        <MMKVButton title="Get Number" onPress={handleGetNumber} />
      </View>
      <View style={styles.row}>
        <MMKVButton title="Set Boolean" onPress={handleSetBoolean} />
        <MMKVButton title="Get Boolean" onPress={handleGetBoolean} />
      </View>
      <View style={styles.row}>
        <MMKVButton title="Set Object (JSON)" onPress={handleSetObject} />
        <MMKVButton title="Get Object (JSON)" onPress={handleGetObject} />
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
});
