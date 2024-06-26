import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {Image, TouchableOpacity} from 'react-native';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {theme} from '../../constants/theme';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <Box
      h={75}
      bg="white"
      px="sm"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{borderTopWidth: 1, borderTopColor: theme.color.greyLightest}}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box
          h={50}
          w={50}
          bg="blueLight"
          radius={10}
          mr={10}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{overflow: 'hidden'}}>
          <Image
            source={{uri: playerContext.currentTrack.artwork}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{flex: 1}}
          />
        </Box>
        <Box f={1} mr={20}>
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box mr={10}>
          {playerContext.isPaused && (
            <TouchableOpacity onPress={() => playerContext.play()}>
              <Icon name="play" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isPlaying && (
            <TouchableOpacity onPress={playerContext.pause}>
              <Icon name="pause" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isStopped && (
            <TouchableOpacity onPress={() => null}>
              <Icon name="square" size={30} />
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity onPress={() => playerContext.seekTo()}>
            <Icon name="rotate-cw" size={30} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default MiniPlayer;
