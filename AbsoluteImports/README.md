## Absolute Imports In React Native

![img_alt](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*dwHbDTAFUnbWLeRtu7LWfA.jpeg)

Absolute imports help to simplify the paths and better organize the project as it grows. Also with absolute imports, it's easier to copy-paste the code with imports into another file in the project and not have to tinker with import paths.

When the project’s folder structure is complex, we are going to have long relative imports in the project like this:

```js
import Input from ‘../../../components/form/input’;
```

It can be pretty hard to refactor and looks messy. The solution is to convert relative imports to absolute imports.

Step 1 — Install `babel-plugin-module-resolver` plugin

`$ npm install --save-dev babel-plugin-module-resolver`
Or

`$ yarn add --dev babel-plugin-module-resolver`
Step 2 — Update babel.config.js

Add the following code snippet in babel.config.js

```js
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
```

Note: `@app` is an alias one can give whatever one wants.

Step 3 — Setup `jsconfig.json` or `tsconfig.json`

Using JavaScript

Create/open jsconfig.json file (in the root directory of the project) and add baseUrl and paths setting inside compilerOptions as shown in the snippet below:

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths" : {
      "@app/*": ["src/*"]
    }
  }
}
```

Using TypeScript

If you’re using TypeScript in React Native project, update tsconfig.json file (in the root directory of the project) and add the same setting inside compilerOptions as JavaScript.

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths" : {
      "@app/*": ["src/*"]
    }
  }
}
```

Step 4 — Implement Absolute Import

Absolute imports setting is now successfully configured with src folder as a custom base directory and we can import an input component located at src/components/form/input.js from like so:

```js
import Input from '@app/components/form/input';
```
