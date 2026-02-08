import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const secureStorage = createMMKV({
  id: 'secure-storage',
  encryptionKey: 'secr3t',
});
