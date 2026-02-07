import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { inspectEffects } from './slice';
import { RootState } from '../../../store/rootReducer';

const EffectComponent = () => {
  const dispatch = useDispatch();
  const { callEffect, putEffect } = useSelector(
    (state: RootState) => state.effect,
  );

  const handleInspect = () => {
    dispatch(inspectEffects());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Effect Object Inspection</Text>
      <Text style={styles.description}>
        In Redux-Saga, Effects are plain JavaScript objects containing
        instructions for the middleware. When a Saga yields an Effect, the
        middleware executes the instruction.
      </Text>

      <Button
        title="Inspect 'call' and 'put' Effects"
        onPress={handleInspect}
      />

      {callEffect && (
        <View style={styles.result}>
          <Text style={styles.label}>Call Effect Object:</Text>
          <Text style={styles.code}>{callEffect}</Text>
        </View>
      )}

      {putEffect && (
        <View style={styles.result}>
          <Text style={styles.label}>Put Effect Object:</Text>
          <Text style={styles.code}>{putEffect}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    color: '#555',
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});

export default EffectComponent;
