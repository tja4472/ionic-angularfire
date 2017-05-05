import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private authState: firebase.User = null;

user: Observable<firebase.User>;

    constructor(   
        public afAuth: AngularFireAuth 
    ) {
        console.log('AuthService');
    this.user = afAuth.authState;

        this.user.subscribe((state: firebase.User) => {
            console.log('AuthService:state', state);
            this.authState = state;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
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
