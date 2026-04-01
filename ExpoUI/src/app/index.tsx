import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Host, LazyColumn, Text, ListItem } from '@expo/ui/jetpack-compose';
import { fillMaxSize, padding } from '@expo/ui/jetpack-compose/modifiers';

import { JetpackHeader } from '@/components/JetpackHeader';
import { LayoutDemo } from '@/components/LayoutDemo';
import { FormControlDemo } from '@/components/FormControlDemo';
import { DatePickerDemo } from '@/components/DatePickerDemo';
import { DropdownDemo } from '@/components/DropdownDemo';
import { CarouselDemo } from '@/components/CarouselDemo';
import { BottomSheetDemo } from '@/components/BottomSheetDemo';

/**
 * Expo UI Demo: Jetpack Compose on Android
 * 
 * Optimized Layout:
 * Using a single native LazyColumn to host all demo sections
 * for maximum performance and native Material 3 scrolling behavior.
 */

export default function ExpoUIDemo() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.rnContainer}>
        <Host style={styles.host}>
          <LazyColumn modifiers={[fillMaxSize()]}>
            {/* 1. Header Section */}
            <JetpackHeader />
            
            {/* 2. Layout & Buttons Section */}
            <LayoutDemo />
            
            {/* 3. Form Controls Section */}
            <FormControlDemo />

            {/* 4. Date & Time Pickers Section */}
            <DatePickerDemo />

            {/* 5. Dropdown Menu Section */}
            <DropdownDemo />

            {/* 6. Native Carousel Section */}
            <CarouselDemo />

            {/* 7. Modal Bottom Sheet Section */}
            <BottomSheetDemo />
            
            {/* 8. Lazy List Section */}
            <Text 
              style={{ typography: 'titleLarge' }} 
              modifiers={[padding(16, 24, 16, 12)]}
            >
              LazyColumn Recycler Items
            </Text>

            {Array.from({ length: 15 }, (_, i) => (
               <ListItem 
                key={i}
                headline={`Native Item ${i + 1}`}
                supportingText="Material Design 3 slot based item"
                onPress={() => console.log(`Pressed item ${i + 1}`)}
              >
                <ListItem.Leading>
                  <Text 
                    style={{ typography: 'labelLarge' }} 
                    modifiers={[padding(0, 0, 8, 0)]}
                  >
                    #{i}
                  </Text>
                </ListItem.Leading>
                <ListItem.Trailing>
                   <Text style={{ typography: 'labelSmall' }}>MD3</Text>
                </ListItem.Trailing>
              </ListItem>
            ))}

            <Text 
              style={{ typography: 'labelSmall' }} 
              modifiers={[padding(16, 32, 16, 32)]}
            >
              Built with @expo/ui + Android Jetpack Compose
            </Text>
          </LazyColumn>
        </Host>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rnContainer: {
    flex: 1,
  },
  host: {
    flex: 1,
  }
});
