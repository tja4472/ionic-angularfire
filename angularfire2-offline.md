## Add source
- Create folder dsrc in app folder.
- Into dsrc copy contents of angularfire2-offline\src.
- Delete all *.spec.ts files.

package.json
```
"json-stringify-safe": "^5.0.1",
```
app.module.ts
```
import { AngularFireOfflineModule } from "../dsrc/angularfire2-offline";

AngularFireModule.initializeApp(MyFirebaseAppConfig),
AngularFireOfflineModule,     
AngularFireAuthModule,
```
todo.service.ts
```
import { AfoListObservable, AngularFireOfflineDatabase } from "../dsrc/database";
```
