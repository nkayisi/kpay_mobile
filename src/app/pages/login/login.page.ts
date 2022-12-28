import { OtpPage } from './../otp/otp.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phone: string;
  password: string;

  user: any;

  constructor(private router:Router, 
    public modalController: ModalController,
    private http: HttpClient, public storage: Storage) {

      this.storage.create();

      this.storage.get('user').then(user => {
        this.user = user;
        if(this.user != null){
          this.router.navigate(['home']);
        }
      })

     }


  postAPI(url: string, body:any=null){
    return this.http.post(url, body);
  }

  async presentModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  login(){
    this.postAPI("http://localhost:8000/auth/login/", {phone: this.phone, password: this.password})
    .subscribe(user => {
      console.log(user);
      this.storage.set('user', user);
      this.router.navigate(['home']);
    });
    // this.presentModal(OtpPage);
  }

  register(){
    this.presentModal(RegisterPage);
  }

  readAPI(url: string){
    return this.http.get(url);
  }

  ngOnInit() {
    
  }

}
