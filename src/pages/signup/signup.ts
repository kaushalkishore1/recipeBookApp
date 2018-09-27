import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService:AuthService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
  }

  onSignup(form:NgForm){
    //console.log(form.value);
   const loading = this.loadingCtrl.create({
     content:'Singing you up...'
   });
   loading.present();

    this.authService.signup(form.value.email,form.value.password)
    .then(data=>{loading.dismiss();})
    .catch(error=>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title:'SignUp failed',
        message:error.message,
        buttons:['ok']
      });
      alert.present();
    });
  }

}
