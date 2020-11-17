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
import { NgxSpinnerModule } from "ngx-spinner";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './mydateformat';
import { MonthandyearwiseinvoiceComponent } from './monthandyearwiseinvoice/monthandyearwiseinvoice.component';
import { DatewiseinvoiceComponent } from './datewiseinvoice/datewiseinvoice.component';
import {NgxPrintModule} from 'ngx-print';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BujukiboutiqueComponent } from './bujukiboutique/bujukiboutique.component';


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
    SareeproductgstComponent,
    MonthandyearwiseinvoiceComponent,
    DatewiseinvoiceComponent,
    BujukiboutiqueComponent
  ],
  imports: [
    NgxPrintModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    AutocompleteLibModule
    //MomentDateModule
    
  ],
  providers: [ApiService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
