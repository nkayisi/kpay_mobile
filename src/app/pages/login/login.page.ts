import { OtpPage } from './../otp/otp.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router, public modalController: ModalController) { }

  async presentModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  login(){
    this.presentModal(OtpPage);
  }

  register(){
    this.presentModal(RegisterPage);
  }

  ngOnInit() {
  }

}
