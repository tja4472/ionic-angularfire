import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from 'ionic-angular';
// import { SignupPage } from '../signup/signup.page';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.page.html'
})
export class LoginPage {
  // login: { username?: string, password?: string } = {};
  submitted = false;
  public loginForm: FormGroup; 

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    ) {
    //
     this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });   
  }

  onLogin(form: FormGroup) {
    this.submitted = true;

    if (form.valid) {
              console.log('EmailAuthenticationAction>', form.value.username);
/*        
      this.store.dispatch(
        this.loginActions.emailAuthentication(
          this.login.username,
          this.login.password));
*/          
    }
  }


  onSignup() {
      console.log('onSignup');
    // this.nav.push(SignupPage);
  }

  signInAnonymously() {
      console.log('signInAnonymously');
   // this.store.dispatch(
   //   new loginActions.AnonymousAuthenticationAction());
  }

  signInWithGoogle() {
      console.log('signInWithGoogle');
      
   // this.store.dispatch(
   //   new loginActions.GoogleAuthenticationAction());
  }
}
