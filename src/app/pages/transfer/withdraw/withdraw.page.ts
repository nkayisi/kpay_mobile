import { Component, OnInit } from '@angular/core';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {

  phone: any;
  currency: string;
  amount: number;

  constructor(private http: HttpClient, public storage: Storage) { }



  withdrawMonney(){
    if (this.phone && this.currency && this.amount) {
      this.storage.get('user').then(user => {
        this.postAPI("http://localhost:8000/api/transaction/", {amount:this.amount, currency:this.currency, 
          recever:this.phone, sender:user.user.phone, type:'Retrait'}, user.token).subscribe(data => {
            location.reload();
          });
      });
    }
  }



  ngOnInit() {
    this.storage.create();
  }


  postAPI(url: string, body:any=null, token){
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Authorization': 'Token '+token,
      }),
    });
  }

}
