import React, { useState } from 'react';
import { Column, Text, Button, DropdownMenu, DropdownMenuItem, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const DropdownDemo = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Option');

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }} modifiers={[padding(0, 0, 0, 12)]}>
        Dropdown Menu
      </Text>

      <DropdownMenu 
        expanded={expanded} 
        onDismissRequest={() => setExpanded(false)}
      >
        <DropdownMenu.Trigger>
          <Button onClick={() => setExpanded(true)}>
            <Text>{selectedOption}</Text>
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Items>
          {options.map((option) => (
            <DropdownMenuItem 
              key={option} 
              onClick={() => {
                setSelectedOption(option);
                setExpanded(false);
              }}
            >
              <DropdownMenuItem.Text>
                <Text>{option}</Text>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenu.Items>
      </DropdownMenu>

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 24, 0, 24)]} />
    </Column>
  );
};
