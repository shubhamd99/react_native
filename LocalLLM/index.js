/**
 * @file Entry point for the LocalLLM application.
 * This file handles necessary polyfills for Node.js globals required by various LLM libraries
 * and registers the main App component with the React Native AppRegistry.
 */

// React Native
import { AppRegistry } from 'react-native';

// Polyfills
import 'react-native-get-random-values';
import 'web-streams-polyfill/dist/polyfill';
import 'text-encoding';
import structuredClone from 'structured-clone';
import { Buffer } from 'buffer';
import process from 'process';

// Components
import App from './App';

// Constants
import { name as appName } from './app.json';

/**
 * Polyfill Node.js globals for libraries like Vercel AI SDK.
 * These are required for many modern JavaScript libraries that expect a Node-like environment.
 */
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

if (typeof global.process === 'undefined') {
  global.process = process;
}

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = structuredClone;
}

// Register the root component
AppRegistry.registerComponent(appName, () => App);
