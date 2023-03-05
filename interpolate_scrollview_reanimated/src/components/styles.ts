import {StyleSheet, Dimensions} from 'react-native';

export const {height, width} = Dimensions.get('window');
export const SIZE = width * 0.7; // 70% of screen width

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  wrapper: {
    position: 'absolute',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default styles;
