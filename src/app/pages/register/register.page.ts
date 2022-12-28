import { OtpPage } from './../otp/otp.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})



export class RegisterPage implements OnInit {

  name: string;
  phone: string;
  password: string;


  res = {};

  constructor(public modalController: ModalController, private http: HttpClient) { }





  postAPI(url: string, body:any=null){
      return this.http.post(url, body);
  }



  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  registration() {

    const user = {
      name: this.name,
      phone: this.phone,
      password: this.password
    }

    this.postAPI("http://localhost:8000/auth/validate-phone/", {phone: user.phone}).subscribe(d => {
        console.log(d)
        this.dismiss();
        this.presentModal(OtpPage, user);
    })

    // this.postAPI("http://localhost:8000/auth/register/", user).subscribe(data => {
    //   console.log(data);
    //   // this.res = data as Object;
    //   // this.res.
    //     // this.dismiss();
    //     // this.presentModal(OtpPage);
    // });

  }

  ngOnInit() {
  }

  async presentModal(component: any, user: any) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{user: user},
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
