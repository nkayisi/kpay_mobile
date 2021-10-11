import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[ 
      {
        path: 'wallet',
        children:[
          {
            path:'',
            loadChildren: () => import('../pages/wallet/wallet.module').then( m => m.WalletPageModule)
          }
        ]
      },
      {
        path: 'activity',
        children:[
          {
            path:'',
            loadChildren: () => import('../pages/activity/activity.module').then( m => m.ActivityPageModule)
          }
        ]
      },
      {
        path: 'bill',
        children:[
          {
            path:'',
            loadChildren: () => import('../pages/bill/bill.module').then( m => m.BillPageModule)
          }
        ]
      },
      {
        path: 'transfer',
        children:[
          {
            path:'',
            loadChildren: () => import('../pages/transfer/transfer.module').then( m => m.TransferPageModule)
          }
        ]
      },
      {
        path:'',
        redirectTo:'transfer',
        pathMatch:'full'
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
