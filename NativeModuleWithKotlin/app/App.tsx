import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import ToastExample from './native_modules/ToastExample';
import VideoStream from './native_modules/VideoStream';
import {FlatGrid} from 'react-native-super-grid';
import {VIDEOS} from './constants';
import {IVideos} from './types';

function App(): JSX.Element {
  const onHandleItemPress = (item: IVideos) => {
    ToastExample.show('Playing: ' + item.title, ToastExample.LONG);
    VideoStream.playVideoStream(item.title, item.url);
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={130}
        data={VIDEOS}
        style={styles.gridView}
        renderItem={({item}: {item: IVideos}) => (
          <TouchableWithoutFeedback onPress={() => onHandleItemPress(item)}>
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{uri: item.thumbnail}} />
              <Text style={styles.videoTitle}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  //grid
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 150,
    backgroundColor: '#2ecc71',
  },
  videoTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    padding: 5,
  },
  image: {
    flexGrow: 1,
    height: undefined,
    width: undefined,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
