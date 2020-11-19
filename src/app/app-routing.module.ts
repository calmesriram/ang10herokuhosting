import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BujukiboutiqueComponent } from './bujukiboutique/bujukiboutique.component';
import { CustomerComponent } from './customer/customer.component';
import { DatewiseinvoiceComponent } from './datewiseinvoice/datewiseinvoice.component';
import { HomeComponent } from './home/home.component';
import { IncludedgstComponent } from './includedgst/includedgst.component';
import { IncludedgstbillpageComponent } from './includedgstbillpage/includedgstbillpage.component';
import { MonthandyearwiseinvoiceComponent } from './monthandyearwiseinvoice/monthandyearwiseinvoice.component';
import { NonincludedgstComponent } from './nonincludedgst/nonincludedgst.component';
import { NonincludedgstbillpageComponent } from './nonincludedgstbillpage/nonincludedgstbillpage.component';
import { ProductComponent } from './product/product.component';
import { SareebillpageComponent } from './sareebillpage/sareebillpage.component';
import { SareeproductgstComponent } from './sareeproductgst/sareeproductgst.component';
import { SareeproductpageComponent } from './sareeproductpage/sareeproductpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
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
    path:'sareeproduct',
    component:SareeproductpageComponent
  },
  {
    path:'sareeproductgst',
    component:SareeproductgstComponent
  },
  {
    path:'includedgstbillpage',
    component:IncludedgstbillpageComponent
  },
  {
    path:'nonincludedgstbillpage',
    component:NonincludedgstbillpageComponent
  },
  {
    path:'botique',
    component:BujukiboutiqueComponent
  },
  {
    path:'includedgst',
    component:IncludedgstComponent
  },
  {
    path:'nonincludedgst',
    component:NonincludedgstComponent
  },
  {
    path:'sareebill',
    component:SareebillpageComponent
  },
  {
    path:'invoicemonthandyearwise',
    component:MonthandyearwiseinvoiceComponent
  },
  {
    path:'invoicedatewise',
    component:DatewiseinvoiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
