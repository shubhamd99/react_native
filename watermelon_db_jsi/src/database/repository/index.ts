import {database} from '../../../index';
import Post from '../model/PostModel';
import {TABLE_NAME} from '../model/schema';

class Repository {
  async getAllPosts() {
    const allPosts = await database.get<Post>(TABLE_NAME).query().fetch();
    return allPosts;
  }

  // All modifications to the database (like creating, updating, deleting records)
  // must be done in a Writer, either by wrapping your work in database.write():
  // Or by defining a @writer method on a Model:
  async addPost() {
    await database.write(async () => {
      const x = Math.floor(Math.random() * 256);
      const y = Math.floor(Math.random() * 256);
      const z = Math.floor(Math.random() * 256);
      const bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';

      await database.get<Post>(TABLE_NAME).create(post => {
        post.title = 'New post';
        post.body = bgColor;
        post.isPinned = false;
      });
    });
  }

  async updatePostIsPinned(postId: string) {
    await database.write(async () => {
      const post = await database.get<Post>(TABLE_NAME).find(postId);
      await post.update(() => {
        post.isPinned = true;
      });
    });
  }

  async deletePost(postId: string) {
    await database.write(async () => {
      const post = await database.get<Post>(TABLE_NAME).find(postId);
      await post.destroyPermanently();
    });
  }

  async deleteAll() {
    // await somePost.markAsDeleted() --> syncable
    // await somePost.destroyPermanently() --> permanent
    await database.write(async () => {
      await database.get<Post>(TABLE_NAME).query().destroyAllPermanently();
    });
  }
}

export default new Repository();
