import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {checkCameraPermission} from '../../modules/PermissionModule';
import styles from './styles';
import {CameraModule} from '../../modules/CameraModule';

enum CAMERA_STATE {
  CAMERA = 'CAMERA',
  LOADING = 'LOADING',
}

const HomeScreen = () => {
  const [cameraState] = useState(CAMERA_STATE.CAMERA);
  const [scannedText, setScannedText] = useState('');

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const loadingScreen = useMemo(() => {
    return (
      <View style={styles.progressBar}>
        <ActivityIndicator color={'#900C3F'} size={'large'} />
      </View>
    );
  }, []);

  const onBarcodeScan = useCallback((value: string | null) => {
    console.log('scanned text::', value);
    if (value) {
      setScannedText(value);
    }
  }, []);

  const renderView = useMemo(() => {
    switch (cameraState) {
      case CAMERA_STATE.CAMERA:
        return (
          <CameraModule
            loadingScreen={loadingScreen}
            containerStyle={styles.camera}
            onBarcodeScan={onBarcodeScan}
          />
        );
      default:
        return loadingScreen;
    }
  }, [cameraState, loadingScreen, onBarcodeScan]);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>{renderView}</View>
      <View style={styles.bottom}>
        <Text style={styles.text}>Scanned QRCode/Barcode:</Text>
        <View style={styles.barcodeText}>
          <Text style={styles.barcode}>{scannedText}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
