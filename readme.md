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
