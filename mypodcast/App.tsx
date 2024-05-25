import React from 'react';
import {Box, UtilityThemeProvider} from 'react-native-design-utility';
import {theme} from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigators';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('player is setup');

      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.JumpForward,
          Capability.JumpBackward,
        ],
        forwardJumpInterval: 30,
        backwardJumpInterval: 30,
      });

      setIsReady(true);
    });
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        {isReady ? (
          <PlayerContextProvider>
            <NavigationContainer>
              <MainStackNavigator />
            </NavigationContainer>
          </PlayerContextProvider>
        ) : (
          <Box f={1} center>
            <ActivityIndicator />
          </Box>
        )}
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
