import {PermissionsAndroid, Platform} from 'react-native';

const cameraAndroidPermission = {
  title: 'Camera App',
  message: 'Camera App needs access to your camera',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

export const checkCameraPermission = async (): Promise<boolean> => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
    async response => {
      if (response === false) {
        return await requestCameraPermission();
      } else {
        return true;
      }
    },
  );
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    return false;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      cameraAndroidPermission,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
  } catch (err) {
    console.log('[Error] requestCameraPermission', err);
  }
  return false;
};
