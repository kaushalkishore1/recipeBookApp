import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService:AuthService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
  }

  onSignin(form:NgForm){
    //console.log(form.value);
   const loading = this.loadingCtrl.create({
     content:'Singing you up...'
   });
   loading.present();

    this.authService.signin(form.value.email,form.value.password)
    .then(data=>{loading.dismiss();})
    .catch(error=>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title:'SignIn failed',
        message:error.message,
        buttons:['ok']
      });
      alert.present();
    });
  }
  
}
