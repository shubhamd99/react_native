// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Example of how to customize Metro in production:
// 1. Add support for SVG imports (requires react-native-svg-transformer)
// config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
// config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
// config.resolver.sourceExts.push("svg");

// 2. Resolve additional extensions if using specific web libraries
// config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
