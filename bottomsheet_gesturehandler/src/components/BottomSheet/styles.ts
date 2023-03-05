import {StyleSheet, Dimensions} from 'react-native';

export const {height: SCREEN_HEIGHT} = Dimensions.get('window');
export const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default styles;
