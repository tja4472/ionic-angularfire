# Side Menu app with angularfire2

Created with ionic 2.0.0-rc.0.
```
Latest release
npm install -g ionic

Started using sidemenu template
ionic start my-side-menu sidemenu --v2
```

### my-firebase-app-config.ts
Create this file in app folder.
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
### Debugger for Chrome extension
Google Chrome shortcut Target
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```
package.json
```
"description": "my-side-menu: An Ionic project",
"config": {
    "ionic_source_map": "source-map"
},
```
launch.json
```
{
    "name": "Attach to Chrome, with sourcemaps",
    "type": "chrome",
    "request": "attach",
    "port": 9222,
    "sourceMaps": true,
    "webRoot": "${workspaceRoot}",
    "url":"http://localhost:8100/"          
}
```
tsconfig.json
```
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,    
    "target": "es5"      
  },
  "include": [
    "src/**/*.ts"
  ],  
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
```
https://forum.ionicframework.com/t/how-to-debug-typescript-in-ionic-2-apps-using-vs-code-and-app-scripts-0-0-46/70023