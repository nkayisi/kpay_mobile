import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  invoices:any = [];
  bills:any = [];

  constructor(private http: HttpClient, public storage: Storage) { }

  ngOnInit() {

    this.storage.create();

    this.storage.get('user').then(user => {
      this.readAPI("http://localhost:8000/api/bill/", user.token)
      .subscribe(data => {
        this.invoices = data;
        for (let index = 0; index < this.invoices.length; index++) {
          const element = this.invoices[index];
          if (element.recipient.phone == user.user.phone) {
            this.bills.push(element);
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
