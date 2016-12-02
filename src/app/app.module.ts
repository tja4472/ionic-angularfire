import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TodosPage } from '../pages/todos/todos.page';
import { TodoModalPage } from '../pages/todo-modal/todo-modal.page';

import { TodoListComponent } from '../components/todo-list/todo-list.component';

import { AngularFireModule } from 'angularfire2';
import { MyFirebaseAppConfig } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { TodoService } from '../services/todo.service';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    TodosPage,
    TodoListComponent,    
    TodoModalPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig.config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    TodosPage,
    TodoModalPage,
  ],
  providers: [
    TodoService,

    // Here we tell the Angular ErrorHandling class
    // that it should be using the IonicErrorHandler class for any errors
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
