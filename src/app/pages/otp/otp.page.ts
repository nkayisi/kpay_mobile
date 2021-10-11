import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router:Router,public modalController: ModalController) { }

  verifyOtp() {
    this.dismiss();
    this.router.navigate(['home']);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
