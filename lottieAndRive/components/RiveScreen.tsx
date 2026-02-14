import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Rive, { RiveRef } from 'rive-react-native';

const RiveScreen = () => {
  const riveRef = useRef<RiveRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Using a known working public Rive file
  // This is the "Vehicles" example from Rive
  const RIVE_URL = 'https://cdn.rive.app/animations/vehicles.riv';

  const handlePlay = () => {
    riveRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    riveRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rive Animation</Text>
      <View style={styles.animationContainer}>
        <Rive
          ref={riveRef}
          url={RIVE_URL}
          style={styles.rive}
          autoplay={true}
          stateMachineName="bumpy"
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={isPlaying ? handlePause : handlePlay}
          />
        </View>

        <Text style={styles.note}>
          Note: Rive animations are interactive by default. Tap on the animation
          to interact if triggers are set up.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  animationContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rive: {
    width: 300,
    height: 300,
  },
  controls: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default RiveScreen;
