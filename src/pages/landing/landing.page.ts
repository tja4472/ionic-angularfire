import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'landing-page',  
  templateUrl: 'landing.page.html'
})
export class LandingPage {
  constructor(
    public navCtrl: NavController, 
    ) {
  }

}
