import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';

interface ICameraModuleProps {
  loadingScreen: JSX.Element;
  containerStyle: StyleProp<ViewStyle>;
  onBarcodeScan: (value: string | null) => void;
  disableTorch?: boolean;
}

export const CameraModule = (props: ICameraModuleProps) => {
  const [hasPermission, setPermission] = React.useState(false);

  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    console.log('detectedBarcodes', detectedBarcodes);
    runOnJS(props.onBarcodeScan)(detectedBarcodes[0].displayValue || '');
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('camera status', status);
      setPermission(status === 'authorized');
    })();
  }, []);

  const torch = props.disableTorch ? 'off' : 'on';

  if (!device || !hasPermission) {
    return props.loadingScreen;
  }

  return (
    <Camera
      style={props.containerStyle}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
      torch={torch}
      audio={false}
      onError={err => {
        console.log('[Error] Camera Module', err);
      }}
      orientation="portrait"
    />
  );
};
