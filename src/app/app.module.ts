import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './appmaterial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { IncludedgstbillpageComponent } from './includedgstbillpage/includedgstbillpage.component';
import { NonincludedgstbillpageComponent } from './nonincludedgstbillpage/nonincludedgstbillpage.component';
import { SareeproductpageComponent } from './sareeproductpage/sareeproductpage.component';
import { SareebillpageComponent } from './sareebillpage/sareebillpage.component';
import { NonincludedgstComponent } from './nonincludedgst/nonincludedgst.component';
import { IncludedgstComponent } from './includedgst/includedgst.component';
import { SareeproductgstComponent } from './sareeproductgst/sareeproductgst.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    ProductComponent,
    IncludedgstbillpageComponent,
    NonincludedgstbillpageComponent,
    SareeproductpageComponent,
    SareebillpageComponent,
    NonincludedgstComponent,
    IncludedgstComponent,
    SareeproductgstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  providers: [ApiService],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
