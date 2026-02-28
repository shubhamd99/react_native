# Re.Pack — Webpack Bundler for React Native (Callstack)

**Re.Pack** is a Webpack 5-based bundler for React Native, maintained by **Callstack**. It enables **Code Splitting** and **Module Federation** in React Native apps — something Metro cannot do. See `mono_repo_yarn` for related multi-package setup.

## When to use Re.Pack vs Metro

| | Metro | Re.Pack |
|---|---|---|
| **Default** | Yes | No — opt-in |
| **Code Splitting** | No | Yes |
| **Module Federation** | No | Yes |
| **Super Apps** | No | Yes |
| **Webpack ecosystem** | No | Yes (loaders, plugins) |
| **Setup complexity** | Simple | Advanced |

Use Re.Pack when: building super apps, mini-apps, dynamic feature delivery, or sharing code between multiple RN apps at runtime.

## Setup

```bash
yarn add -D @callstack/repack webpack
```

`webpack.config.mjs`:
```js
import path from 'path';
import * as Repack from '@callstack/repack';

export default (env) => {
  const { platform, mode, devServer } = env;

  return {
    mode: mode || 'development',
    devtool: false,
    context: __dirname,
    entry: './index.js',

    resolve: {
      ...Repack.getResolveOptions(platform),
      extensions: [
        `.${platform}.ts`, `.${platform}.tsx`,
        '.native.ts', '.native.tsx',
        '.ts', '.tsx', '.js', '.jsx', '.json',
      ],
    },

    module: {
      rules: [
        Repack.REACT_NATIVE_LOADING_RULES,
        Repack.NODE_MODULES_LOADING_RULES,
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'builtin:swc-loader',
            options: { jsc: { externalHelpers: true } },
          },
        },
      ],
    },

    plugins: [
      new Repack.RepackPlugin({
        context: __dirname,
        platform,
        devServer,
      }),
    ],
  };
};
```

`package.json` scripts:
```json
{
  "scripts": {
    "start": "react-native start --bundler repack",
    "build:ios": "react-native bundle --bundler repack --platform ios --entry-file index.js --bundle-output ./build/ios/main.jsbundle",
    "build:android": "react-native bundle --bundler repack --platform android --entry-file index.js --bundle-output ./build/android/main.jsbundle"
  }
}
```

## Code Splitting — Async Chunks

Split non-critical code into chunks loaded on demand:

```tsx
// Before: static import (always in main bundle)
import HeavyFeature from './HeavyFeature';

// After: dynamic import (loaded on demand)
const HeavyFeature = React.lazy(() => import('./HeavyFeature'));

// Usage with Suspense
<Suspense fallback={<ActivityIndicator />}>
  <HeavyFeature />
</Suspense>
```

### Script Manager (Re.Pack's chunk loader)
```tsx
import { ScriptManager, Script } from '@callstack/repack/client';

// Configure where chunks are served from
ScriptManager.shared.addResolver(async (scriptId) => {
  // In production: serve from CDN
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }
  return {
    url: Script.getRemoteURL(`https://cdn.example.com/chunks/${scriptId}`),
  };
});
```

### Prefetching a chunk
```tsx
import { ScriptManager } from '@callstack/repack/client';

// Prefetch before the user navigates
const prefetchFeature = async () => {
  await ScriptManager.shared.prefetchScript('heavy-feature');
};
```

## Module Federation (Super App Pattern)

Share code between a **Host** app and **Remote** mini-apps at runtime:

### Host webpack config
```js
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

plugins: [
  new ModuleFederationPlugin({
    name: 'HostApp',
    remotes: {
      MiniApp: `MiniApp@${MINI_APP_URL}/mf-manifest.json`,
    },
    shared: {
      react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      'react-native': { singleton: true, eager: true },
    },
  }),
]
```

### Remote (mini-app) webpack config
```js
new ModuleFederationPlugin({
  name: 'MiniApp',
  filename: 'mf-manifest.json',
  exposes: {
    './MiniAppScreen': './src/MiniAppScreen',
  },
  shared: {
    react: { singleton: true },
    'react-native': { singleton: true },
  },
}),
```

### Consuming a remote in the host
```tsx
// Dynamic import of remote component
const MiniAppScreen = React.lazy(() => import('MiniApp/MiniAppScreen'));

const App = () => (
  <Suspense fallback={<LoadingScreen />}>
    <MiniAppScreen />
  </Suspense>
);
```

## Callstack's Super App Architecture

```
/super-app (monorepo)
├── apps/
│   ├── host/          ← Main app shell, navigation, auth
│   └── mini-app-1/    ← Independent feature app (remote)
│   └── mini-app-2/
├── packages/
│   ├── ui/            ← Shared design system
│   └── shared/        ← Shared utilities, hooks
└── package.json       ← Yarn workspaces root
```

## Key Re.Pack Concepts

- **Chunks**: Individual JS bundles loaded at runtime (not included in main bundle)
- **ScriptManager**: Re.Pack's runtime that resolves and loads chunks
- **Module Federation**: Share actual module code between separate webpack builds at runtime
- **Async storage of chunks**: Chunks can be cached locally for offline access

## Rules & Gotchas
- Re.Pack does NOT support tree shaking the same way Metro does — audit bundle sizes
- Remote debugging (Chrome DevTools) works differently — use Flipper or Hermes Inspector
- `__webpack_require__` replaces `require` — most Metro-specific hacks won't work
- Keep `react` and `react-native` as `singleton: true` in Module Federation to avoid multiple React instances
- Test on both platforms — chunk loading can behave differently on iOS vs Android
- See Callstack's official Re.Pack docs: https://re-pack.dev
