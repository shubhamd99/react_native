import {StyleSheet} from 'react-native';

export const SIZE = 100.0;
export const CIRCLE_RADIUS = SIZE * 2;

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_RADIUS * 1.6,
    height: CIRCLE_RADIUS * 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
  },
});

export default styles;
