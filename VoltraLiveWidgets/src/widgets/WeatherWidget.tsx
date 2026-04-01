import React from 'react';
import { Voltra, VoltraAndroid, type WidgetVariants } from 'voltra';
import { Card, VStack, HStack } from '../components/voltra/Primitives';
import { Platform } from 'react-native';

/**
 * Weather Widget UI
 */
const WeatherWidgetUI: React.FC<{
  city: string;
  temp: string;
  condition: string;
}> = ({ city, temp, condition }) => {
  const TextComponent = Platform.OS === 'android' ? VoltraAndroid.Text : Voltra.Text;

  return (
    <Card backgroundColor="#3B82F6">
      <HStack style={{ width: '100%' }} horizontalAlignment="center-horizontally">
        <VStack style={{ flex: 1 }}>
          <TextComponent style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>
            {temp}°
          </TextComponent>
          <TextComponent style={{ color: 'white', opacity: 0.8 }}>
            {city}
          </TextComponent>
        </VStack>
        <VStack style={{ alignItems: 'flex-end' }}>
          <TextComponent style={{ fontSize: 28 }}>☀️</TextComponent>
          <TextComponent style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
            {condition}
          </TextComponent>
        </VStack>
      </HStack>
    </Card>
  );
};

/**
 * Export Widget Variants
 * This is what the Voltra config plugin expects when it loads this file
 * to pre-render the initial state of the widget.
 */
const variants: WidgetVariants = {
  systemSmall: <WeatherWidgetUI city="SF" temp="72" condition="Sunny" />,
  systemMedium: <WeatherWidgetUI city="San Francisco" temp="72" condition="Sunny" />,
};

export default variants;
export { WeatherWidgetUI };
