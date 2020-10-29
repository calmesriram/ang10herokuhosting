import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];
@Component({
  selector: 'app-datewiseinvoice',
  templateUrl: './datewiseinvoice.component.html',
  styleUrls: ['./datewiseinvoice.component.css']
})
export class DatewiseinvoiceComponent implements OnInit {

  displayedColumns2:any = ['print','position','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  
  displayedColumns:any = ['print','position','taxdet_role','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  

  dataSource = new MatTableDataSource(ELEMENT_DATA); 
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2); 

  dateForm: FormGroup;
  datesareeForm: FormGroup;
  monthandyearForm: FormGroup;
array_mon_year:any=[];
productloader:boolean;
productsareeloader:boolean;
  constructor(public api:ApiService,public formBuilder: FormBuilder,public router:Router) { }

  ngOnInit(): void {
    this.array_mon_year.push(
      {month:"01",year:(new Date()).getFullYear()},
      {month:"02",year:(new Date()).getFullYear()},
      {month:"03",year:(new Date()).getFullYear()},
      {month:"04",year:(new Date()).getFullYear()},
      {month:"05",year:(new Date()).getFullYear()},
      {month:"06",year:(new Date()).getFullYear()},
      {month:"07",year:(new Date()).getFullYear()},
      {month:"08",year:(new Date()).getFullYear()},
      {month:"09",year:(new Date()).getFullYear()},
      {month:"10",year:(new Date()).getFullYear()},
      {month:"11",year:(new Date()).getFullYear()},
      {month:"12",year:(new Date()).getFullYear()},
      
    )
    this.dateForm = this.formBuilder.group({  
      date: ['', Validators.required]
      
  });
  this.datesareeForm = this.formBuilder.group({  
    datesaree: ['', Validators.required]
    
});

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter) 
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource2.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource2.filter) 
  }
  onSubmit(){
    if(this.dateForm.controls.date.value == "" || this.dateForm.controls.date.value == null || this.dateForm.controls.date.value == undefined){
      this.api.snackmsg("Please Choose date","close");
      return;
    }else{
      this.productloader = true;
      let datewise_product =  {
          "invoicedate":this.dateForm.controls.date.value.toLocaleDateString('en-GB')
        }
         
        this.api.Invoiceproductdate(datewise_product).then(res =>{
          console.log(res)
          if(res["status"] == true){
            this.dataSource = new MatTableDataSource(res["data"]);
            this.productloader = false;
          }
        }).catch(e =>{
          this.productloader = false;
          console.log(e)
        })
    }
  }
  onSubmitsareeproduct(){
    if(this.datesareeForm.controls.datesaree.value == "" || this.datesareeForm.controls.datesaree.value == null || this.datesareeForm.controls.datesaree.value == undefined){
      this.api.snackmsg("Please Choose date","close");
      return;
    }else{
      this.productsareeloader = true;
             
let datewise_product_saree =  {
  "cust_invoicedate":this.datesareeForm.controls.datesaree.value.toLocaleDateString('en-GB')
}
        this.api.Invoiceproductsareedate(datewise_product_saree).then(res =>{
          console.log(res)
          if(res["status"] == true){
            this.dataSource2 = new MatTableDataSource(res["data"]);
            this.productsareeloader = false;
          }
        }).catch(e =>{
          this.productsareeloader = false;
          console.log(e)
        })
    }
  }

  datewiseforproduct(data){
    if(data.taxdet_role == "nonincludedgst"){
      // console.log(data)
      this.api.billingarray_nonincgst.invoiceno = data.invoicenumber;
      this.api.billingarray_nonincgst.invoicedate = data.invoicedate;
      this.api.billingarray_nonincgst.tabledatadet= data.tabledatadet;
      this.api.billingarray_nonincgst.customerdetails.customername =data.name;   
      this.api.billingarray_nonincgst.customerdetails.phoneumber =data.phonenumber;
      this.api.billingarray_nonincgst.customerdetails.address=data.address;
      this.api.billingarray_nonincgst.customerdetails.partygstin=data.partygstin;
      this.api.billingarray_nonincgst.tax_details.taxdet_totalamountbeforetax = data.taxdet_totalamountbeforetax;
      this.api.billingarray_nonincgst.tax_details.taxdet_totalamountofcgsttax = data.taxdet_totalamountofcgsttax; 
      this.api.billingarray_nonincgst.tax_details.taxdet_totalamountofsgsttax = data.taxdet_totalamountofsgsttax;
      this.api.billingarray_nonincgst.tax_details.taxdet_totalamountoftax= data.taxdet_totalamountoftax;
      this.api.billingarray_nonincgst.tax_details.taxdet_totalamountaftertax = data.taxdet_totalamountaftertax;
      alert("Your have been selected Invoice Number of "+data.invoicenumber + " And " + data.taxdet_role +" Page");
      this.router.navigateByUrl('/nonincludedgstbillpage');
      return;
    }
    if(data.taxdet_role == "includedgst"){
      // console.log(data)
      this.api.billingarray_incgst.invoiceno = data.invoicenumber;
      this.api.billingarray_incgst.invoicedate = data.invoicedate;
      this.api.billingarray_incgst.tabledatadet= data.tabledatadet;
      this.api.billingarray_incgst.customerdetails.customername =data.name;   
      this.api.billingarray_incgst.customerdetails.phoneumber =data.phonenumber;
      this.api.billingarray_incgst.customerdetails.address=data.address;
      this.api.billingarray_incgst.customerdetails.partygstin=data.partygstin;
      this.api.billingarray_incgst.tax_details.taxdet_totalamountbeforetax = data.taxdet_totalamountbeforetax;
      this.api.billingarray_incgst.tax_details.taxdet_totalamountofcgsttax = data.taxdet_totalamountofcgsttax; 
      this.api.billingarray_incgst.tax_details.taxdet_totalamountofsgsttax = data.taxdet_totalamountofsgsttax;
      this.api.billingarray_incgst.tax_details.taxdet_totalamountoftax= data.taxdet_totalamountoftax;
      this.api.billingarray_incgst.tax_details.taxdet_totalamountaftertax = data.taxdet_totalamountaftertax;
      alert("Your have been selected Invoice Number of "+data.invoicenumber + " And " + data.taxdet_role +" Page");
      this.router.navigateByUrl('/includedgstbillpage');
      return;
    }
  }
  datewiseforsareeproduct(data){
    // console.log(data)
    this.api.billingarray_sareeprod.invoiceno = data.cust_invoicenumber;
    this.api.billingarray_sareeprod.invoicedate = data.cust_invoicedate;
    this.api.billingarray_sareeprod.customerdetails.customername = data.cust_name;
    this.api.billingarray_sareeprod.customerdetails.phoneumber = data.cust_phonenumber;
    this.api.billingarray_sareeprod.customerdetails.address =data.cust_address;
    this.api.billingarray_sareeprod.customerdetails.partygstin = data.cust_partygstin;
    this.api.billingarray_sareeprod.tabledatadet = data.cust_tabledatadet;
    this.api.billingarray_sareeprod.tax_details.totamtwithtax = data.custtaxdet_roundoff;
    this.api.billingarray_sareeprod.tax_details.cgsttax = data.custtaxdet_cgsttaxamount;
    this.api.billingarray_sareeprod.tax_details.sgsttax = data.custtaxdet_sgsttaxamount;
    this.api.billingarray_sareeprod.tax_details.taxamt = data.custtaxdet_taxamount;
    this.api.billingarray_sareeprod.tax_details.totamt = data.custtaxdet_totalamount;
    alert("Your have been selected Invoice Number of "+data.cust_invoicenumber + " At " + data.cust_invoicedate);
      this.router.navigateByUrl('/sareebill');
      return;
  }

}
