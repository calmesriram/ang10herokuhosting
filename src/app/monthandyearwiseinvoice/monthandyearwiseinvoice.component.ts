import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];

@Component({
  selector: 'app-monthandyearwiseinvoice',
  templateUrl: './monthandyearwiseinvoice.component.html',
  styleUrls: ['./monthandyearwiseinvoice.component.css']
})
export class MonthandyearwiseinvoiceComponent implements OnInit {
  monthandyearsareeForm: FormGroup;
  monthandyearForm: FormGroup;
  array_mon_year:any=[];
  
    datesareeForm: FormGroup;
  productloader:boolean;
  productsareeloader:boolean;
  constructor(public api:ApiService,public formBuilder: FormBuilder,public router:Router) { }

  displayedColumns2:any = ['print','position','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  
  displayedColumns:any = ['print','position','taxdet_role','invoicenumber','name','phonenumber','adhaarid','invoicedate','total','emailid'];  

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

}
