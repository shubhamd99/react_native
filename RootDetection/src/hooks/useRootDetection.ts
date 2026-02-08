import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';

export interface RootDetectionState {
  isJailBroken: boolean | null;
  isEmulator: boolean | null;
  hookDetected: boolean | null;
  canMockLocation: boolean | null;
  trustFall: boolean | null;
  isDebuggedMode: boolean | null;
}

export const useRootDetection = () => {
  const [state, setState] = useState<RootDetectionState>({
    isJailBroken: null,
    isEmulator: null,
    hookDetected: null,
    canMockLocation: null,
    trustFall: null,
    isDebuggedMode: null,
  });

  useEffect(() => {
    checkRootStatus();
  }, []);

  const checkRootStatus = async () => {
    // Jail Monkey Checks
    const isJailBroken = JailMonkey.isJailBroken();
    const hookDetected = JailMonkey.hookDetected();
    const canMockLocation = JailMonkey.canMockLocation();
    const trustFall = JailMonkey.trustFall();

    // isDebuggedMode might be async or sync depending on version,
    // typically in jail-monkey it returns boolean but let's handle it safely
    // Actually based on my type def I made it Promise<boolean> but checking docs it's usually boolean in older versions
    // standard jail-monkey isJailBroken is sync.
    // Let's assume sync for now based on previous code working,
    // but newer versions of react-native-jail-monkey might have async methods.
    // The previous code used it as sync.
    // Wait, let me re-check my previous code...
    // setIsDebuggedMode(JailMonkey.isDebuggedMode()); -> It was used as sync.

    let isDebuggedMode = false;
    try {
      // @ts-ignore
      isDebuggedMode = await JailMonkey.isDebuggedMode();
    } catch (e) {
      console.log('isDebuggedMode check failed or is not async', e);
      // @ts-ignore
      isDebuggedMode = JailMonkey.isDebuggedMode();
    }

    // Device Info Checks
    const isEmulator = await DeviceInfo.isEmulator();

    setState({
      isJailBroken,
      hookDetected,
      canMockLocation,
      trustFall,
      isDebuggedMode,
      isEmulator,
    });

    if (isJailBroken) {
      Alert.alert(
        'Security Warning',
        'This device appears to be rooted or jailbroken. The app may not function correctly.',
      );
    }
  };

  return state;
};
