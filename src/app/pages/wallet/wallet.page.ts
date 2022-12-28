import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  user_object:any = {};
  usd: number;
  cdf: number;
  phone: string;

  constructor(private storage: Storage, private http: HttpClient) {

    this.storage.create();

    this.storage.get('user').then(user => {
      this.readAPI("http://localhost:8000/api/client/"+user.user.id+"/", user.token)
      .subscribe(data => {
          this.user_object = data;
          this.usd = this.user_object.usd_balance.toFixed(2);
          this.cdf = this.user_object.cdf_balance.toFixed(2);
        });
    });


   }

  ngOnInit() {
  }


  readAPI(url: string, token){
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token,
      }),
    });
  }

}
