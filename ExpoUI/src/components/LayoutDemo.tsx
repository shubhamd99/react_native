import React from 'react';
import { Column, Row, Text, Button, FilledTonalButton, OutlinedButton, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const LayoutDemo = () => {
  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }}>
        Layout & Buttons
      </Text>
      
      <Row 
        horizontalArrangement={{ spacedBy: 12 }} 
        verticalAlignment="center" 
        modifiers={[fillMaxWidth(), padding(0, 12, 0, 24)]}
      >
        <Button onClick={() => console.log('Primary Clicked')}>
          <Text>Primary</Text>
        </Button>
        <FilledTonalButton onClick={() => console.log('Tonal Clicked')}>
          <Text>Tonal</Text>
        </FilledTonalButton>
        <OutlinedButton onClick={() => console.log('Outlined Clicked')}>
          <Text>Outlined</Text>
        </OutlinedButton>
      </Row>

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 0, 0, 24)]} />
    </Column>
  );
};
