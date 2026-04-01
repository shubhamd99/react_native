import React from 'react';
import { Column, Text } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const JetpackHeader = () => {
  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 16, 16, 8), fillMaxWidth()]}
    >
      <Text 
        style={{ typography: 'displayMedium' }} 
      >
        Expo UI & Jetpack
      </Text>
      <Text 
        style={{ typography: 'bodyLarge' }} 
      >
        Native Material Design 3 Components
      </Text>
    </Column>
  );
};
