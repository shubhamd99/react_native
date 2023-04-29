import React, {useState, useEffect} from 'react';
import {Freeze} from 'react-freeze';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {fetchProfileData, fetchUser} from '../api/fakeAPI';
import {IPost, IUser} from '../types';

const FreezeScreen = () => {
  const [profileResponse, setProfileResponse] = useState<IUser | null>(null);
  const [postsResponse, setPostsResponse] = useState<[IUser, IPost[]] | null>(
    null,
  );

  async function callService() {
    setProfileResponse(null);
    setPostsResponse(null);
    const localProfile = await fetchUser();

    setProfileResponse(localProfile);

    setTimeout(async () => {
      const localPosts = await fetchProfileData();
      setPostsResponse(localPosts);
    }, 1000);
  }

  const loadingScreen = () => {
    return (
      <View style={styles.progressBar}>
        <ActivityIndicator color={'#900C3F'} size={'large'} />
      </View>
    );
  };

  useEffect(() => {
    callService();
  }, []);

  return profileResponse === null ? (
    loadingScreen()
  ) : (
    <>
      <View style={styles.btn}>
        <Button onPress={() => callService()} title="Refresh" />
      </View>
      <Freeze freeze={profileResponse === null}>
        <View style={styles.wrapper}>
          <ProfileDetails user={profileResponse} />
          {postsResponse === null ? (
            <Text style={styles.loadingText}>Loading posts...</Text>
          ) : (
            <Freeze freeze={postsResponse === null}>
              <ProfileTimeline posts={postsResponse[1]} />
            </Freeze>
          )}
        </View>
      </Freeze>
    </>
  );
};

function ProfileDetails({user}: {user: IUser}) {
  // Try to read user info, although it might not have loaded yet
  return <Text style={styles.title}>User: {user.name}</Text>;
}

function ProfileTimeline({posts}: {posts: IPost[]}) {
  // Try to read posts, although they might not have loaded yet
  return (
    <ScrollView>
      {posts.map(post => (
        <Text key={post.id}>{JSON.stringify(post)}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 10,
  },
  wrapper: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    color: 'red',
  },
});

export default FreezeScreen;
