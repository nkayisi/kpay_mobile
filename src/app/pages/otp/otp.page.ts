import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  user;
  otp: string;

  constructor(private router:Router,
    public modalController: ModalController,
    private http: HttpClient, public storage: Storage) {

      this.storage.create();

     }


  postAPI(url: string, body:any=null){
    return this.http.post(url, body);
  }

  verifyOtp() {

    this.postAPI("http://localhost:8000/auth/validate-otp/", {phone: this.user.phone, otp:this.otp}).subscribe(d => {
        console.log(d)
        this.postAPI("http://localhost:8000/auth/register/", {
          phone: this.user.phone,
          name: this.user.name,
          password: this.user.password
        }).subscribe(d => {
          console.log(d)
          this.postAPI("http://localhost:8000/auth/login/", {phone: this.user.phone, password: this.user.password})
          .subscribe(user => {
            console.log(user)
            this.storage.set('user', user);
            this.dismiss();
            this.router.navigate(['home']);
          })
        })
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    
  }

}
