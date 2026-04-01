import React, { useState } from 'react';
import { View } from 'react-native';
import { Column, Row, Text, Slider, Switch, Checkbox, SearchBar, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const FormControlDemo = () => {
  const [sliderValue, setSliderValue] = useState(0.5);
  const [isSwitched, setIsSwitched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }} modifiers={[padding(0, 0, 0, 12)]}>
        Form Controls
      </Text>
      
      <SearchBar 
        onSearch={(text) => console.log('Searching:', text)}
        modifiers={[fillMaxWidth(), padding(0, 0, 0, 16)]}
      >
        <SearchBar.Placeholder>
           <Text>Search Jetpack items...</Text>
        </SearchBar.Placeholder>
      </SearchBar>

      <Row verticalAlignment="center" modifiers={[fillMaxWidth(), padding(0, 0, 0, 16)]}>
        <Text style={{ typography: 'bodyMedium' }} modifiers={[padding(0, 0, 12, 0)]}>Switch</Text>
        <Switch value={isSwitched} onCheckedChange={setIsSwitched} />
        
        <View style={{ width: 24 }} />
        
        <Text style={{ typography: 'bodyMedium' }} modifiers={[padding(0, 0, 12, 0)]}>Checkbox</Text>
        <Checkbox value={isChecked} onCheckedChange={setIsChecked} />
      </Row>

      <Column modifiers={[fillMaxWidth(), padding(0, 0, 0, 24)]}>
        <Text style={{ typography: 'bodyMedium' }}>Slider: {(sliderValue * 100).toFixed(0)}%</Text>
        <Slider 
          value={sliderValue} 
          onValueChange={setSliderValue}
          modifiers={[fillMaxWidth()]}
        />
      </Column>

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 0, 0, 24)]} />
    </Column>
  );
};
