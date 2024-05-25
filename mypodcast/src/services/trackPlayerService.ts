import TrackPlayer, {Event} from 'react-native-track-player';

export default async function trackPlayerServices() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {});

  TrackPlayer.addEventListener(Event.PlaybackState, state => {
    console.log('playback-state', state);
  });
}
