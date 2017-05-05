import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LandingPage } from '../pages/landing/landing.page';
import { LoginPage } from '../pages/login/login.page';
import { TodosPage } from '../pages/todos/todos.page';
//
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any; // = Page1;

  pages: Array<{ title: string, component: any }>;

user: Observable<firebase.User>;

  constructor(
    // @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    public afAuth: AngularFireAuth ,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,    
  ) {
    /*    
        let unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
          console.log('firebaseApp:user', user);
          if (!user) {
            console.log('aaaaa');
            unsubscribe();
            this.rootPage = Page1;
          } else {
            unsubscribe();
            console.log('bbbbb');
            this.rootPage = LandingPage;
          }
        });
    */
    this.user = afAuth.authState;

    this.user
      .take(1)
      .subscribe((state: firebase.User) => {
        console.log('MyApp:state>>>', state);
        let authenticated = !!state;

        if (authenticated) {
          this.rootPage = Page1;
        } else {
          this.rootPage = LandingPage;
        }
      });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Todos Page', component: TodosPage },
      { title: 'Login', component: LoginPage },       
      { title: 'Logout', component: LandingPage },      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();      
    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // this.auth$.logout();
      }, 1000);
    }    
  }
}
