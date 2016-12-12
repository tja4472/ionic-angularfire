import { Injectable } from '@angular/core';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState = null;

    constructor(   
        public auth$: FirebaseAuth
    ) {
        console.log('AuthService');

        this.auth$.subscribe((state: FirebaseAuthState) => {
            console.log('AuthService:state', state);
            this.authState = state;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    signOut(): void {
        this.auth$.logout();
    }
    /*
        get authState(): FirebaseAuthState {
            return this.authState;
        }
    */
}
