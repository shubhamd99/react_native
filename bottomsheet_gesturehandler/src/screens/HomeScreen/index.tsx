import React, {useCallback, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetRefProps} from '../../components/BottomSheet';
import styles from './styles';

const HomeScreen = () => {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} />
      <BottomSheet ref={ref} />
    </View>
  );
};

export default HomeScreen;
