import './tailwind.css';

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DlsDemo } from '@screens/DlsDemo';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DlsDemo />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
