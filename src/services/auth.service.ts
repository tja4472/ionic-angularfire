import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private authState$: Observable<firebase.User>;
    private currentUser: firebase.User;

    constructor(
        public afAuth: AngularFireAuth
    ) {
        console.log('AuthService');
        this.authState$ = afAuth.authState;

        this.authState$.subscribe((user: firebase.User) => {
            console.log('AuthService:user', user);
            this.currentUser = user;
        });
    }

    get authenticated(): boolean {
        return this.currentUser !== null;
    }

    signOut(): void {
        this.afAuth.auth.signOut();
    }
    /*
        get authState(): FirebaseAuthState {
            return this.authState;
        }
    */
}
