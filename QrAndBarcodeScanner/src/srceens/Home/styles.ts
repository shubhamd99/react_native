import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  cameraContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#AEB6BF',
  },
  progressBar: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    height: 120,
    paddingTop: 10,
    paddingLeft: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  barcodeText: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#AEB6BF',
    height: 50,
    paddingTop: 5,
    paddingLeft: 10,
  },
  barcode: {
    fontSize: 14,
    color: '#900C3F',
  },
});

export default styles;
