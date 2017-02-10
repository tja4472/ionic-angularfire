

# Ignore this
ppp
## Now uses Ionic's instructions
See: https://github.com/danbucholtz/ionic-rollup-angularfire2

Using CommonJS modules with rollup: 
https://github.com/driftyco/ionic-app-scripts/issues/16

http://ionicframework.com/docs/v2/resources/app-scripts/

http://ionicframework.com/docs/v2/resources/third-party-libs/

## After npm install
Copy the contents of config/af-rollup.config.js into node_modules/@ionic/app-scripts/config/rollup.config.js.

## Changes required
### package.json
```
  "dependencies": {
    "@types/request": "0.0.30",
    "angularfire2": "2.0.0-beta.5",
    "firebase": "3.4.1", 
```
### config/af-rollup.config.js
This is a copy of node_modules/@ionic/app-scripts/config/rollup.config.js install with npm install with the following added 
```
module.exports = {
  ...
  useStrict: false,
  ...
  commonjs(
    {    
        namedExports: {
        'node_modules/angularfire2/node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database'],
        'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        }
    }),
    ...    
```
This replaces node_modules/@ionic/app-scripts/config/rollup.config.js.

### tsconfig.json
```
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    "typeRoots": [
      "../node_modules/@types"
    ],
    "types": [
      "firebase"
    ]    
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
```
### app.module.ts
``` typescript
import { AngularFireModule } from 'angularfire2';

import { MyFirebaseAppConfig } from './my-firebase-app-config';


  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),
  ],
```
### my-firebase-app-config.ts
``` typescript
import {
    FirebaseAppConfig
} from 'angularfire2';

export class MyFirebaseAppConfig {
    static config: FirebaseAppConfig = {
    apiKey: 'xxxxx',
    authDomain: 'xxxxx',
    databaseURL: 'xxxxx',
    storageBucket: 'xxxxxx''
  };
}
```
## Problems
This line in rollup.config.js makes it difficult to have a copy as a custom config file in a different folder.
```
var ngTemplate = require('../dist/plugins/ng-template').ngTemplate;
```

## Links
    import named doesn't work with re-exported contents.
    https://github.com/rollup/rollup-plugin-commonjs/issues/35

    Getting Started with Ionic 2 RC0, Firebase 3 + AngularFire 2
    https://playcode.org/getting-started-with-ionic-2-rc0-firebase-3-angularfire-2/