/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './src/database/model/schema';
import migrations from './src/database/model/migrations';
import PostModel from './src/database/model/PostModel';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    dbName: 'my_watermelon_db',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true,
    // (optional, but you should implement this method)
    onSetUpError: error => {
      // Database failed to load -- offer the user to reload the app or log out
      console.error("Database Error: ", error);
    }
});

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [
        PostModel,
    ],
});

AppRegistry.registerComponent(appName, () => App);
