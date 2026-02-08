import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { secureStorage } from '../utils/storage';

interface AdvancedOperationsProps {
  onLog: (message: string) => void;
}

export const AdvancedOperations: React.FC<AdvancedOperationsProps> = ({
  onLog,
}) => {
  const handleRecrypt = () => {
    // In a real app, you would manage these keys securely
    secureStorage.recrypt('new-secr3t-key'); // encrypt all data with a private key
    onLog('Recrypted storage with new key');
  };

  const handleTrim = () => {
    // trim - clean unused keys and clear memory cache
    secureStorage.trim();
    onLog('Trimmed storage');
  };

  const handleBuffer = () => {
    // MMKV expects ArrayBuffer or similar for binary data
    // react-native-mmkv supports string | number | boolean | Uint8Array
    // We can simulate binary by storing a string or using specific buffer methods if available in TS definations,
    // but the library mainly exposes string/bool/number.
    // Actually, v2+ supports Uint8Array.
    const uint8 = new Uint8Array([1, 2, 3, 4, 5]);

    // Note: older versions might not support direct Uint8Array in set(), checking types...
    // The type definition says: set(key: string, value: boolean | string | number | ArrayBuffer): void;

    secureStorage.set('myBuffer', uint8.buffer);
    onLog('Set myBuffer (ArrayBuffer) = [1, 2, 3, 4, 5]');

    const retrievedBuffer = secureStorage.getBuffer('myBuffer');
    if (retrievedBuffer) {
      const retrievedUint8 = new Uint8Array(retrievedBuffer);
      onLog(`Get myBuffer = [${retrievedUint8.join(', ')}]`);
    } else {
      onLog('Buffer not found');
    }
  };

  const handleSecureSet = () => {
    secureStorage.set('secretKey', 'super secret value');
    onLog('Set secure secretKey');
  };

  const handleSecureGet = () => {
    const val = secureStorage.getString('secretKey');
    onLog(`Get secure secretKey: ${val}`);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Advanced Operations (Secure Storage)</Text>
      <View style={styles.row}>
        <Button title="Set Secure" onPress={handleSecureSet} />
        <Button title="Get Secure" onPress={handleSecureGet} />
      </View>
      <View style={styles.row}>
        <Button title="Recrypt" onPress={handleRecrypt} />
        <Button title="Trim" onPress={handleTrim} />
        <Button title="Buffer Test" onPress={handleBuffer} />
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
