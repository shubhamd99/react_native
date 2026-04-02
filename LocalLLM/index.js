/**
 * @format
 */
import 'react-native-get-random-values';
import 'web-streams-polyfill/dist/polyfill';
import 'text-encoding';
import structuredClone from 'structured-clone';
import { Buffer } from 'buffer';
import process from 'process';

// Polyfill Node.js globals for libraries like Vercel AI SDK
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

if (typeof global.process === 'undefined') {
  global.process = process;
}

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = structuredClone;
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
