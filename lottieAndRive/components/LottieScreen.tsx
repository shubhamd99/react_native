import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text, Switch } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieScreen = () => {
  const animationRef = useRef<LottieView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [hwAcceleration, setHwAcceleration] = useState(false);

  const handlePlay = () => {
    animationRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    animationRef.current?.pause();
    setIsPlaying(false);
  };

  const handleReset = () => {
    animationRef.current?.reset();
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lottie Animation</Text>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animationRef}
          source={require('../assets/lottie/animation.json')}
          autoPlay={false}
          loop={loop}
          speed={speed}
          style={styles.lottie}
          resizeMode="contain"
          renderMode={hwAcceleration ? 'HARDWARE' : 'SOFTWARE'}
          hardwareAccelerationAndroid={hwAcceleration}
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={isPlaying ? handlePause : handlePlay}
          />
          <Button title="Reset" onPress={handleReset} />
        </View>

        <View style={styles.row}>
          <Text>Loop: </Text>
          <Switch value={loop} onValueChange={setLoop} />
        </View>

        <View style={styles.row}>
          <Text>HW Acceleration: </Text>
          <Switch value={hwAcceleration} onValueChange={setHwAcceleration} />
        </View>

        <View style={styles.row}>
          <Text>Speed: {speed.toFixed(1)}x</Text>
          <Button
            title="-"
            onPress={() => setSpeed(Math.max(0.1, speed - 0.1))}
          />
          <Button
            title="+"
            onPress={() => setSpeed(Math.min(3, speed + 0.1))}
          />
        </View>
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
  },
  lottie: {
    width: '100%',
    height: '100%',
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
});

export default LottieScreen;
