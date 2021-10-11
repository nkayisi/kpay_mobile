import { OtpPage } from './../otp/otp.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public modalController: ModalController) { }

  async presentModal(component: any) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  registration() {
    this.dismiss();
    this.presentModal(OtpPage);
  }

  ngOnInit() {
  }

}
