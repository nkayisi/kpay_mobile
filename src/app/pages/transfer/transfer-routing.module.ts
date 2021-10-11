import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPage } from './transfer.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPage,
    children:[ 
      {
        path: 'send',
        children:[
          {
            path:'',
            loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
          }
        ]
      },
      {
        path: 'withdraw',
        children:[
          {
            path:'',
            loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'send',
        pathMatch:'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
