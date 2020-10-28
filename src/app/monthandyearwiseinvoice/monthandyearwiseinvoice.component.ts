import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthandyearwiseinvoice',
  templateUrl: './monthandyearwiseinvoice.component.html',
  styleUrls: ['./monthandyearwiseinvoice.component.css']
})
export class MonthandyearwiseinvoiceComponent implements OnInit {
  dateForm: FormGroup;
  monthandyearForm: FormGroup;
array_mon_year:any=[];
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
  this.monthandyearForm = this.formBuilder.group({  
    monyeardate: ['', Validators.required]
    
});

  }
  onSubmit(){
  let datewise_product =  {
      "invoicedate":this.dateForm.controls.date.value.toLocaleDateString('en-GB')
    }
     
    this.api.Invoiceproductdate(datewise_product).then(res =>{
      console.log(res)
    }).catch(e =>{
      console.log(e)
    })

let datewise_product_saree =  {
    "cust_invoicedate":this.dateForm.controls.date.value.toLocaleDateString('en-GB')
}
console.log(datewise_product_saree)
    this.api.Invoiceproductsareedate(datewise_product_saree).then(res =>{
      console.log(res)
    }).catch(e =>{
      console.log(e)
    })
  }
  monyear(){
    // console.log(this.monthandyearForm.value)
 let payload =    {
   "invoicemonth":String(this.monthandyearForm.value.monyeardate.month),
   "invoiceyear":String(this.monthandyearForm.value.monyeardate.year)
  }

  let paload2 ={
    "cust_invoicemonth":String(this.monthandyearForm.value.monyeardate.month),
    "cust_invoiceyear":String(this.monthandyearForm.value.monyeardate.year)
  }
  console.log(payload)
    this.api.Invoiceproductmonthandyear(payload).then(res =>{
      console.log(res)
    }).catch(e =>{
      console.log(e)
    })

    this.api.Invoiceproductsareemonthandyear(paload2).then(res =>{
      console.log(res)
    }).catch(e =>{
      console.log(e)
    })
}

}
