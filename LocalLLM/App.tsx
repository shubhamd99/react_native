/**
 * @file Root App component that sets up the navigation structure and providers.
 * This file configures the main navigation stack for the application, including
 * both ExecuTorch and llama.rn based LLM implementations.
 */

// React
import React from 'react';

// React Native
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// LLM Libraries
import { initExecutorch } from 'react-native-executorch';
import { BareResourceFetcher } from 'react-native-executorch-bare-resource-fetcher';

// Context
import { LlamaProvider } from './src/context/LlamaContext';

// Screens
import HomeScreen from './src/screens/Home';
import ChatScreen from './src/screens/Chat';
import SummarizeScreen from './src/screens/Summarize';
import TranslateScreen from './src/screens/Translate';
import CodeExplainerScreen from './src/screens/CodeExplainer';
import PlaygroundScreen from './src/screens/Playground';
import LlamaChatScreen from './src/screens/LlamaChat';
import LlamaGenerateScreen from './src/screens/LlamaGenerate';

/**
 * Initialize ExecuTorch with the bare resource fetcher.
 * This is necessary for loading model files from the local filesystem or assets.
 */
initExecutorch({ resourceFetcher: BareResourceFetcher });

/**
 * Type definition for the root navigation stack parameters.
 */
export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Summarize: undefined;
  Translate: undefined;
  Code: undefined;
  Playground: undefined;
  LlamaChat: undefined;
  LlamaGenerate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The main App component.
 * Sets up SafeAreaProvider, LlamaProvider (for llama.rn), and the NavigationContainer.
 * 
 * @returns {React.JSX.Element} The rendered application.
 */
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <LlamaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFF',
              },
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: '700',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'LocalLLM' }}
            />

            {/* ── react-native-executorch (Meta) ── */}
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ title: '💬 Chat — ExecuTorch' }}
            />
            <Stack.Screen
              name="Summarize"
              component={SummarizeScreen}
              options={{ title: '📝 Summarize — ExecuTorch' }}
            />
            <Stack.Screen
              name="Translate"
              component={TranslateScreen}
              options={{ title: '🌍 Translate — ExecuTorch' }}
            />
            <Stack.Screen
              name="Code"
              component={CodeExplainerScreen}
              options={{ title: '👨‍💻 Code — ExecuTorch' }}
            />
            <Stack.Screen
              name="Playground"
              component={PlaygroundScreen}
              options={{ title: '🧪 Playground — ExecuTorch' }}
            />

            {/* ── @react-native-ai/llama (Callstack) ── */}
            <Stack.Screen
              name="LlamaChat"
              component={LlamaChatScreen}
              options={{ title: '🦙 Chat — llama.rn' }}
            />
            <Stack.Screen
              name="LlamaGenerate"
              component={LlamaGenerateScreen}
              options={{ title: '🦙 Generate — llama.rn' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LlamaProvider>
    </SafeAreaProvider>
  );
}

export default App;
