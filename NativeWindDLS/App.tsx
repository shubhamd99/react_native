import './tailwind.css';

import { StatusBar, useColorScheme } from 'react-native';
import { DlsDemo } from './src/screens/DlsDemo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DlsDemo />
      </SafeAreaProvider>
    </>
  );
}

export default App;
