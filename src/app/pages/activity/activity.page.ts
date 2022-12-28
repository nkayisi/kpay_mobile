import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  transactions:any = [];
  activities:any = [];

  constructor(private http: HttpClient, public storage: Storage) {


   }

  ngOnInit() {

    this.storage.create();

    this.storage.get('user').then(user => {
      this.readAPI("http://localhost:8000/api/transaction/", user.token)
      .subscribe(data => {
        this.activities = data;
        for (let index = 0; index < this.activities.length; index++) {
          const element = this.activities[index];
          if (element.sender.phone == user.user.phone || element.recever.phone == user.user.phone) {
            this.transactions.push(element);
          }
        }
      });
    });

  }



  readAPI(url: string, token){
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token,
      }),
    });
  }

}
