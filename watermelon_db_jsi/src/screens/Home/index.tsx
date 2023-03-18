import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Post from '../../database/model/PostModel';
import repository from '../../database/repository';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      setPosts(await repository.getAllPosts());
    } catch (ex) {
      console.error(ex);
    }
  };

  const addPost = async () => {
    try {
      await repository.addPost();
      getAllPosts();
    } catch (ex) {
      console.error(ex);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await repository.deletePost(postId);
      getAllPosts();
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => deletePost(post.id)}>
              <View style={[styles.item, {backgroundColor: post.body}]}>
                <Text style={styles.text}>ID: {post.id}</Text>
                <Text style={styles.text}>Title: {post.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text style={styles.btnText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  item: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20,
    flex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'orange',
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
