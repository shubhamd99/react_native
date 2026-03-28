// React & React Native
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// Libraries
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Components
import Basic from './src/examples/Basic';
import StickyFooter from './src/examples/StickyFooter';
import AdvancedInteractive from './src/examples/AdvancedInteractive';

// Styles
import { styles } from './App.styles';

export default function App() {
  const [currentExample, setCurrentExample] = useState<string | null>(null);

  const renderExample = () => {
    switch (currentExample) {
      case 'basic':
        return <Basic />;
      case 'sticky':
        return <StickyFooter />;
      case 'advanced':
        return <AdvancedInteractive />;
      default:
        return (
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Keyboard Controller Examples</Text>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setCurrentExample('basic')}
            >
              <Text style={styles.buttonText}>1. Basic Usage</Text>
              <Text style={styles.buttonSubtext}>KeyboardAvoidingView & KeyboardAwareScrollView</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setCurrentExample('sticky')}
            >
              <Text style={styles.buttonText}>2. Sticky Footer</Text>
              <Text style={styles.buttonSubtext}>Custom animation with useKeyboardAnimation</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setCurrentExample('advanced')}
            >
              <Text style={styles.buttonText}>3. Advanced Interaction</Text>
              <Text style={styles.buttonSubtext}>KeyboardToolbar & useKeyboardHandler</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <SafeAreaView style={styles.container}>
          {currentExample && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentExample(null)}
            >
              <Text style={styles.backButtonText}>← Back to Menu</Text>
            </TouchableOpacity>
          )}
          {renderExample()}
        </SafeAreaView>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
