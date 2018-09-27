import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  @ViewChild('nav') nav:NavController
  isAuthenticated = false;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl:MenuController,private authService:AuthService) {
      firebase.initializeApp({
        apiKey: "AIzaSyAE5CRtdSpkXGUAHCs13m4eljLqvo7Y1qs",
        authDomain: "ionic-recipebook-ddcac.firebaseapp.com"
      });
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.isAuthenticated = true;
         // this.nav.setRoot(this.tabsPage);
         this.rootPage = TabsPage;
        }else{
          this.isAuthenticated = false;
          //this.nav.setRoot(this.signinPage);
          this.rootPage = SigninPage;
        }
      })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
   this.nav.setRoot(page);
   this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}
