import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-monthandyearwiseinvoice',
  templateUrl: './monthandyearwiseinvoice.component.html',
  styleUrls: ['./monthandyearwiseinvoice.component.css']
})
export class MonthandyearwiseinvoiceComponent implements OnInit {
  monthandyearsareeForm: FormGroup;
  monthandyearForm: FormGroup;
  array_mon_year:any=[];
  invoice_product_month_year_csv_includedgst:any=[];
  invoice_product_month_year_csv_nonincludedgst:any=[];
  invoice_product_month_year_csv_includedgst_both:any=[];
    datesareeForm: FormGroup;
  productloader:boolean;
  productsareeloader:boolean;
  constructor(public api:ApiService,public formBuilder: FormBuilder,public router:Router) { }

 productcsvheader:any = ["PARTY'S GSTIN","INVOICE NUMBER","INOVICE DATE","NAME","PHONE NUMBER","ADHAAR","ADDRESS","EMAILID","TAX PERCENT","CGST","SGST","TAX AMOUNT","BEFORE TAX AMOUNT","AFTER TAX AMOUNT"]
  displayedColumns2:any = ['position','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  
  displayedColumns:any = ['position','taxdet_role','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  

  dataSource = new MatTableDataSource(ELEMENT_DATA); 
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2); 

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
    this.monthandyearForm = this.formBuilder.group({  
      monyeardate: ['', Validators.required]
      
  });
  this.monthandyearsareeForm = this.formBuilder.group({  
    monyearsareedate: ['', Validators.required]
    
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
      this.productloader = true;
         console.log(this.monthandyearForm.value)
 let payload =    {
   "invoicemonth":String(this.monthandyearForm.value.monyeardate.month),
   "invoiceyear":String(this.monthandyearForm.value.monyeardate.year)
  }
         
        this.api.Invoiceproductmonthandyear(payload).then(res =>{
          console.log(res)
          if(res["status"] == true){
            this.invoice_product_month_year_csv_includedgst.length = 0;
  this.invoice_product_month_year_csv_nonincludedgst.length = 0;
  this.invoice_product_month_year_csv_includedgst_both.length = 0;
            if(res["data"].length != 0){
              res["data"].forEach(async element => {
                if(await element.taxdet_role == "nonincludedgst"){
                  let temp ={
                    "PARTY'S GSTIN":await element.partygstin,
                    "INVOICE NUMBER":await element.invoicenumber,
                    "INOVICE DATE": await element.invoicedate,
                    "NAME":await element.name,
                    "PHONE NUMBER":await element.phonenumber,
                    "ADHAAR":await element.adhaarid,
                    "ADDRESS":await element.address,
                    "EMAILID":await element.emailid,
                    "TAX PERCENT":await element.taxdet_taxpercenttage,
                    "CGST":await element.taxdet_totalamountofcgsttax,
                    "SGST":await element.taxdet_totalamountofsgsttax,
                    "TAX AMOUNT":await element.taxdet_totalamountoftax,
                    "BEFORE TAX AMOUNT":await element.taxdet_totalamountbeforetax,
                    "AFTER TAX AMOUNT":await element.taxdet_totalamountaftertax,
                  }
                  this.invoice_product_month_year_csv_nonincludedgst.push(temp);  
                }
                if(await element.taxdet_role == "includedgst"){
                  let temp ={
                    "PARTY'S GSTIN":await element.partygstin,
                    "INVOICE NUMBER":await element.invoicenumber,
                    "INOVICE DATE": await element.invoicedate,
                    "NAME":await element.name,
                    "PHONE NUMBER":await element.phonenumber,
                    "ADHAAR":await element.adhaarid,
                    "ADDRESS":await element.address,
                    "EMAILID":await element.emailid,
                    "TAX PERCENT":await element.taxdet_taxpercenttage,
                    "CGST":await element.taxdet_totalamountofcgsttax,
                    "SGST":await element.taxdet_totalamountofsgsttax,
                    "TAX AMOUNT":await element.taxdet_totalamountoftax,
                    "BEFORE TAX AMOUNT":await element.taxdet_totalamountbeforetax,
                    "AFTER TAX AMOUNT":await element.taxdet_totalamountaftertax,
                  }
                  this.invoice_product_month_year_csv_includedgst.push(temp);  
                }
                let temp ={
                  "PARTY'S GSTIN":await element.partygstin,
                  "INVOICE NUMBER":await element.invoicenumber,
                  "INOVICE DATE": await element.invoicedate,
                  "NAME":await element.name,
                  "PHONE NUMBER":await element.phonenumber,
                  "ADHAAR":await element.adhaarid,
                  "ADDRESS":await element.address,
                  "EMAILID":await element.emailid,
                  "TAX PERCENT":await element.taxdet_taxpercenttage,
                  "CGST":await element.taxdet_totalamountofcgsttax,
                  "SGST":await element.taxdet_totalamountofsgsttax,
                  "TAX AMOUNT":await element.taxdet_totalamountoftax,
                  "BEFORE TAX AMOUNT":await element.taxdet_totalamountbeforetax,
                  "AFTER TAX AMOUNT":await element.taxdet_totalamountaftertax,
                }
                this.invoice_product_month_year_csv_includedgst_both.push(temp);
              });
            }
            this.dataSource = new MatTableDataSource(res["data"]);
            this.productloader = false;
          }
        }).catch(e =>{
          this.productloader = false;
          console.log(e)
        })
  }
  onSubmitsareeproduct(){
      this.productsareeloader = true;
      let paload2 ={
            "cust_invoicemonth":String(this.monthandyearsareeForm.value.monyearsareedate.month),
            "cust_invoiceyear":String(this.monthandyearsareeForm.value.monyearsareedate.year)
          }
        this.api.Invoiceproductsareemonthandyear(paload2).then(res =>{
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

  productincludedgstcsv(){
    let filename = "Product_includedgst_"+(new Date()).toLocaleDateString('en-GB')+"&"+(new Date()).toLocaleTimeString('en-US');
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: filename,
      useBom: true,
      noDownload: false,
      headers:this.productcsvheader
    };
     new ngxCsv(this.invoice_product_month_year_csv_includedgst,filename, options);
  }
  productnonincludedgstcsv(){
    let filename = "Product_nonincludedgst_"+(new Date()).toLocaleDateString('en-GB')+"&"+(new Date()).toLocaleTimeString('en-US');
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: filename,
      useBom: true,
      noDownload: false,
      headers:this.productcsvheader
    };
     new ngxCsv(this.invoice_product_month_year_csv_nonincludedgst,filename, options);
  }
  productbothcsv(){
    let filename = "Product_included_nonincluded_"+(new Date()).toLocaleDateString('en-GB')+"&"+(new Date()).toLocaleTimeString('en-US');
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: filename,
      useBom: true,
      noDownload: false,
      headers:this.productcsvheader
    };
     new ngxCsv(this.invoice_product_month_year_csv_includedgst_both,filename, options);
  }

}
