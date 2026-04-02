import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { initExecutorch } from 'react-native-executorch';
import { BareResourceFetcher } from 'react-native-executorch-bare-resource-fetcher';

// ── react-native-executorch screens ─────────────────────────────────────────
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import SummarizeScreen from './src/screens/SummarizeScreen';
import TranslateScreen from './src/screens/TranslateScreen';
import CodeExplainerScreen from './src/screens/CodeExplainerScreen';
import PlaygroundScreen from './src/screens/PlaygroundScreen';

// ── @react-native-ai/llama (Callstack) screens ───────────────────────────────
import LlamaChatScreen from './src/screens/LlamaChatScreen';
import LlamaGenerateScreen from './src/screens/LlamaGenerateScreen';
import { LlamaProvider } from './src/context/LlamaContext';

// ── Initialise ExecuTorch once at app startup ────────────────────────────────
// BareResourceFetcher handles model downloads/cache for bare React Native.
// Expo projects should use ExpoResourceFetcher from
// react-native-executorch-expo-resource-fetcher instead.
initExecutorch({ resourceFetcher: BareResourceFetcher });

export type RootStackParamList = {
  Home: undefined;
  // ExecuTorch screens
  Chat: undefined;
  Summarize: undefined;
  Translate: undefined;
  Code: undefined;
  Playground: undefined;
  // Callstack @react-native-ai/llama screens
  LlamaChat: undefined;
  LlamaGenerate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: '#6C63FF' },
  headerTintColor: '#FFF',
  headerTitleStyle: { fontWeight: '700' },
  headerBackTitle: 'Back',
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#6C63FF"
      />
      {/* LlamaProvider wraps the whole app so all Callstack screens share
          one downloaded/prepared model instance without re-loading. */}
      <LlamaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'LocalLLM' }}
            />

            {/* ── react-native-executorch ── */}
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
