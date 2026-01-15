module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@dls': './src/dls',
          // Add any other folders you want to alias here
        },
      },
    ],
    'nativewind/babel',
    'react-native-reanimated/plugin', // Always keep Reanimated last if you use it
  ],
};
