import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Component({
  templateUrl: 'page1.html'
})
export class Page1 {
   items: FirebaseListObservable<any[]>;

  constructor(
    public af: AngularFire,
    public navCtrl: NavController,
  ) {
    this.items = af.database.list(FIREBASE_CURRENT_TODOS);
/*    
      .subscribe(x => {
        console.log('x>', x);
      });
*/      
  }
}
