import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import {
  useMMKVString,
  useMMKVNumber,
  useMMKVBoolean,
  useMMKVObject,
  useMMKVListener,
} from 'react-native-mmkv';
import { secureStorage } from '../utils/storage';
import { MMKVButton } from './MMKVButton';

export const HooksDemo: React.FC = () => {
  const [username, setUsername] = useMMKVString('user.name');
  const [age, setAge] = useMMKVNumber('user.age');
  const [isViP, setIsViP] = useMMKVBoolean('user.isViP');
  const [userObj, setUserObj] = useMMKVObject<{ theme: string }>('user.pref');

  // Listen to changes on secureStorage
  useMMKVListener(key => {
    console.log(`Secure storage changed: ${key}`);
    Alert.alert('Secure Listener', `Key "${key}" changed in secure storage`);
  }, secureStorage);

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Hooks Demo (Auto-updates)</Text>
      <Text>user.name: {username}</Text>
      <TextInput
        style={styles.input}
        value={username ?? ''}
        onChangeText={setUsername}
        placeholder="Type to update user.name"
      />

      <Text>user.age: {age}</Text>
      <MMKVButton
        title="Increment Age"
        onPress={() => setAge((age || 0) + 1)}
      />

      <Text>user.isViP: {isViP ? 'Yes' : 'No'}</Text>
      <MMKVButton title="Toggle ViP" onPress={() => setIsViP(!isViP)} />

      <Text style={styles.jsonText}>
        user.pref (Object): {JSON.stringify(userObj)}
      </Text>
      <MMKVButton
        title="Toggle Theme"
        onPress={() =>
          setUserObj({ theme: userObj?.theme === 'dark' ? 'light' : 'dark' })
        }
      />
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
  jsonText: {
    marginTop: 10,
  },
});
