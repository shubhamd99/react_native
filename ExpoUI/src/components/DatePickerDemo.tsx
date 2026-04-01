import React, { useState } from 'react';
import { Column, Text, Button, FilledTonalButton, DatePickerDialog, TimePickerDialog, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

export const DatePickerDemo = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }} modifiers={[padding(0, 0, 0, 12)]}>
        Pickers (Dialogs)
      </Text>

      <Column verticalArrangement={{ spacedBy: 12 }} modifiers={[fillMaxWidth(), padding(0, 0, 0, 16)]}>
        <Button onClick={() => setShowDatePicker(true)}>
          <Text>{selectedDate ? `Date: ${selectedDate.toLocaleDateString()}` : 'Pick Date'}</Text>
        </Button>

        <FilledTonalButton onClick={() => setShowTimePicker(true)}>
          <Text>{selectedTime ? `Time: ${selectedTime.toLocaleTimeString()}` : 'Pick Time'}</Text>
        </FilledTonalButton>
      </Column>

      {showDatePicker && (
        <DatePickerDialog
          onDismissRequest={() => setShowDatePicker(false)}
          onDateSelected={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
        />
      )}

      {showTimePicker && (
        <TimePickerDialog
          onDismissRequest={() => setShowTimePicker(false)}
          onDateSelected={(date) => {
            setSelectedTime(date);
            setShowTimePicker(false);
          }}
        />
      )}

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 0, 0, 24)]} />
    </Column>
  );
};
