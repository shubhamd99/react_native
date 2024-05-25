import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());

  TrackPlayer.addEventListener(
    Event.RemoteJumpForward,
    async ({interval}: {interval: number}) => {
      const position = await TrackPlayer.getProgress();
      await TrackPlayer.seekTo(position.position + interval);
    },
  );

  TrackPlayer.addEventListener(
    Event.RemoteJumpBackward,
    async ({interval}: {interval: number}) => {
      const position = await TrackPlayer.getProgress();
      await TrackPlayer.seekTo(position.position - interval);
    },
  );
};
