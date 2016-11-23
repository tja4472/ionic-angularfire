import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { AngularFireModule } from 'angularfire2';
import { MyFirebaseAppConfig } from './my-firebase-app-config';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: [
    // Here we tell the Angular ErrorHandling class
    // that it should be using the IonicErrorHandler class for any errors
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
