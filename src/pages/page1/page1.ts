import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

import { AuthService } from '../../services/auth.service';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Component({
    templateUrl: 'page1.html'
})
export class Page1 {
    angularfireResult$: FirebaseListObservable<any[]>;
    firebaseResult: any;

    constructor(
        private firebaseApp: FirebaseApp,
        private db: AngularFireDatabase,
        private authService: AuthService,
        private navCtrl: NavController,
    ) {
        console.log('##Page1');
        // console.log('authService.authenticated>', authService.authenticated);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad');
        this.angularfireResult$ = this.db.list(FIREBASE_CURRENT_TODOS);

        this.firebaseApp.database()
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

    ionViewCanEnter(): boolean {
        console.log('ionViewCanEnter');
        console.log('authService.authenticated>', this.authService.authenticated);
        return true;
    }

}
