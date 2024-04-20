## Widgets in React Native

## Shared preferences

If you have a relatively small collection of key-values that you'd like to save, you can use the SharedPreferences APIs. A SharedPreferences object points to a file containing key-value pairs and provides simple methods to read and write them. Each SharedPreferences file is managed by the framework and can be private or shared.

### RN Package

- Package Name - react-native-shared-group-preferences

```jsx
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const appGroupIdentifier = 'group.com.mytest';
const userData = {
  name: 'Vin Diesel',
  age: 34,
  friends: ['Lara Croft', 'Mike Meyers'],
};
await SharedGroupPreferences.setItem('savedData', data, appGroupIdentifier);
const loadedData = await SharedGroupPreferences.getItem(
  'savedData',
  appGroupIdentifier,
);
```

- The file is saved to the user's storage in the following format: $storage/$appGroupIdentifier/data.json. So make sure your appGroupIdentifier is a valid folder name

### Check if anyother app is installed or not

```jsx
// This Android only script lets you check if another app is installed based on package name. The example below is for Facebook.
const facebookPackageName = 'com.facebook.android';
try {
  const installed = await SharedGroupPreferences.isAppInstalledAndroid(
    facebookPackageName,
  );
  console.log('Facebook is installed on this device');
} catch (err) {
  console.log('Facebook is not installed');
}
```

## Create a new widget

![widget_create](https://i.imgur.com/E3IhwgF.png)

![widget_create](https://i.imgur.com/1RJxpJL.png)

![widget_create](https://i.imgur.com/WG2FXyv.png)
