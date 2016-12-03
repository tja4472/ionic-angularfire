import { Component, Inject } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

// https://stackoverflow.com/questions/39067832/accessing-firebase-storage-with-angularfire2-angular2-rc-5/39069813#39069813

@Component({
    templateUrl: 'page1.html'
})
export class Page1 {
    angularfireResult$: FirebaseListObservable<any[]>;
    firebaseResult: any;

    /*
         @Inject(FirebaseApp) firebaseApp: firebase.app.App,
         gives error with ngc.
         ionic build android
         https://github.com/angular/angular/issues/12631
    */
    constructor(
        @Inject(FirebaseApp) firebaseApp: any,
        public af: AngularFire,
        public navCtrl: NavController,
    ) {

        this.angularfireResult$ = af.database.list(FIREBASE_CURRENT_TODOS);

        //
        firebaseApp.database()
            .ref()
            .child('/textItems')
            .on('value', (snapshot: any) => {
                let firebaseData: any = snapshot.val();
                console.log('/textItems', ':', firebaseData);
                this.firebaseResult = firebaseData;
            },
            (error: any) => {
                console.log('The read failed: ', error);
            }
            );
    }
}
