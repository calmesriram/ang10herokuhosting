import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { Bill2Component } from './bill2/bill2.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'product',
    component:ProductComponent
  },
  {
    path:'receipt',
    component:BillComponent
  },
  {
    path:'receipt2',
    component:Bill2Component
  },
  {
    path:'print',
    component:PrintComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
