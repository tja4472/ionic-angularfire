# Side Menu app with angularfire2

Created with ionic 2.0.0-rc.0.
```
Latest release
npm install -g ionic

Started using sidemenu template
ionic start my-side-menu sidemenu --v2
```
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

### app.module.ts
``` typescript
import { AngularFireModule } from 'angularfire2';

// Bodge: error TS2503: Cannot find namespace 'firebase'.
// tslint:disable-next-line:no-unused-variable
import * as firebase from 'firebase';

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
Can't make custom config files work on Windows 10. Can't find the config file.

https://github.com/driftyco/ionic-app-scripts

## Links
import named doesn't work with re-exported contents

https://github.com/rollup/rollup-plugin-commonjs/issues/35
