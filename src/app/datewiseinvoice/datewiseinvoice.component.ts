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

//     (new Date()).toLocaleDateString('en-GB');
// (new Date()).getMonth() +1 ;
// (new Date()).getFullYear();
    // this.api.Invoiceproductmonthandyear((new Date()).toLocaleDateString('en-GB')).then(res =>{
    //   console.log(res)
    // }).catch(e =>{
    //   console.log(e)
    // })
    this.dateForm = this.formBuilder.group({  
      date: ['', Validators.required]
      
  });
  this.datesareeForm = this.formBuilder.group({  
    datesaree: ['', Validators.required]
    
});
  this.monthandyearForm = this.formBuilder.group({  
    monyeardate: ['', Validators.required]
    
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
//   monyear(){
//     // console.log(this.monthandyearForm.value)
//  let payload =    {
//    "invoicemonth":String(this.monthandyearForm.value.monyeardate.month),
//    "invoiceyear":String(this.monthandyearForm.value.monyeardate.year)
//   }

//   let paload2 ={
//     "cust_invoicemonth":String(this.monthandyearForm.value.monyeardate.month),
//     "cust_invoiceyear":String(this.monthandyearForm.value.monyeardate.year)
//   }
//   console.log(payload)
//     this.api.Invoiceproductmonthandyear(payload).then(res =>{
//       console.log(res)
//     }).catch(e =>{
//       console.log(e)
//     })

//     this.api.Invoiceproductsareemonthandyear(paload2).then(res =>{
//       console.log(res)
//     }).catch(e =>{
//       console.log(e)
//     })
// }

}
