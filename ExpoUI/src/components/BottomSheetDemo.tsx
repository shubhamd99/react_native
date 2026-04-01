import React, { useState } from 'react';
import { Column, Text, Button, ModalBottomSheet, ListItem, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const BottomSheetDemo = () => {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }} modifiers={[padding(0, 0, 0, 12)]}>
        Modal Bottom Sheet
      </Text>

      <Button onClick={() => setShowSheet(true)} modifiers={[padding(0, 0, 0, 24)]}>
        <Text>Open Bottom Sheet</Text>
      </Button>

      {showSheet && (
        <ModalBottomSheet onDismissRequest={() => setShowSheet(false)}>
          <Column modifiers={[padding(16, 0, 16, 32), fillMaxWidth()]}>
             <Text style={{ typography: 'headlineSmall' }} modifiers={[padding(0, 0, 0, 16)]}>
                Sheet Title
             </Text>
             <ListItem headline="Action 1" supportingText="Secondary info for action 1" onPress={() => setShowSheet(false)} />
             <ListItem headline="Action 2" supportingText="Secondary info for action 2" onPress={() => setShowSheet(false)} />
             <ListItem headline="Action 3" supportingText="Secondary info for action 3" onPress={() => setShowSheet(false)} />
          </Column>
        </ModalBottomSheet>
      )}

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 24, 0, 24)]} />
    </Column>
  );
};
