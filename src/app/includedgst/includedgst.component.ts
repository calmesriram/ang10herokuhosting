import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

var ELEMENT_DATA: any = [];
@Component({
  selector: 'app-includedgst',
  templateUrl: './includedgst.component.html',
  styleUrls: ['./includedgst.component.css']
})
export class IncludedgstComponent implements OnInit {
  displayedColumns:any = ['position','productname','Delete'];  
  data ="ram"
  datafromparentcompo = "123465"
  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  countryCtrl: FormControl;
  productForm: FormGroup;
  gstForm: FormGroup;
  selectedproditem:any=[];
  countryCtrl2: FormControl;
  country_lis:any=[];
  country_lis2:any=[];
  filteredCountry: Observable<any[]>;
  filteredCountry2: Observable<any[]>;
  value = '';
  value2 = '';
  cus_address:any;
cus_adhaarid:any;
cus_customername:any;
cus_emailid:any;
cus_phonenumber:any; 
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
proditem;
public totamtModel:any=0;

  constructor(public api:ApiService,public formBuilder: FormBuilder,public router:Router) { 
    this.countryCtrl = new FormControl();
    this.countryCtrl2 = new FormControl();
    this.filteredCountry = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this.filtercountry(country) : this.country_lis.slice())
    );
    this.filteredCountry2 = this.countryCtrl2.valueChanges
    .pipe(
      startWith(''),
      map(country => country ? this.filtercountry2(country) : this.country_lis2.slice())
  );
  }

  ngOnInit() {
    this.api.billingarray_incgst = {};
    this.api.billingarray_nonincgst = {};
    // window.print()
    this.api.billingarray_incgst.taxdet_role="includedgst";
    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required],
      // rate: ['', Validators.required],
      // qty: ['', Validators.required]
    
      
  });
  this.gstForm = this.formBuilder.group({    
    taxdet_totalamountbeforetax:['',Validators.required],
    taxdet_totalamountaftertax:['', Validators.required],
    taxdet_totalamountoftax:['', Validators.required],
    taxdet_totalamountofsgsttax:['', Validators.required],
    taxdet_totalamountofcgsttax:['', Validators.required],
    taxdet_taxpercenttage:['', Validators.required],
  })
    this.getcustomer();
    this.getproduct();
    this.productCount();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter) 
  }

  filtercountry(name: string) {
    return this.country_lis.filter(country => 
      country.customername.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filtercountry2(name: string) {
    return this.country_lis2.filter(country => 
      country.productname.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  test(para){  
    this.api.billingarray_incgst.customerdetails = "";
    this.api.billingarray_incgst.customerdetails = para;
    this.cus_address = para.address
    this.cus_adhaarid =para.adhaarid;
    this.cus_customername = para.customername;
    this.cus_emailid = para.emailid
    this.cus_phonenumber = para.phoneumber
    // console.log(para);

  }
  prod(item){
    console.log(item)    
    this.proditem = "";    
    this.proditem = item;
    // this.proditem = this.productForm.controls.qty.setValue(0);
    this.productForm.controls.productname.setValue(item.productname);
    // this.productForm.controls.qty.setValue(0);   
    
  }
  // getTotalAmount() {   
  //   return this.selectedproditem.map(t => t.rate).reduce((acc, value) => acc + value, 0);
  // }
  getcustomer(){
    this.api.Getcustomer().then((data:any) =>{
      // console.log(data.data.length)
      if(data.data.length == 0){
         this.api.snackmsg("No Record(s) Found","Close")
      }
      if( data.status == true && data.data.length != 0){
        // console.log(data)  
        this.country_lis = data.data       
     }
  // console.log(data);
  
    }).catch(err =>{
      // this.api.snackmsg("Hail","close")
    })
  }
  getproduct(){  
    this.api.Getproduct().then((data:any) =>{    
    if(data.data.length == 0){
       this.api.snackmsg("No Record(s) Found","Close")
    }
    if( data.status == true && data.data.length != 0){
      this.country_lis2 = data.data   
      // console.log(data.data)           
    }
    // console.log(data)         
}).catch(err =>{
    // this.api.snackmsg("Hail","close")
  })
}

add() { 
  // this.proditem.rate = this.productForm.controls.rate.value
this.selectedproditem.push(this.proditem);
this.productForm.reset();
console.log(this.selectedproditem)
this.value2=""
this.tabledata();
   
}
taxcalc(){
  console.log("****")
  this.api.billingarray_incgst.tax_details ="";
  let taxamount:any =0;
  let tax_cgst_sgst:any =0;
  let totalamount_withtax:any = 0;
  let totalamount:any = 0;
  let silverrate:any= 0;
  totalamount = this.totamtModel;

  this.gstForm.controls.taxdet_totalamountbeforetax.setValue(0);  
  
  taxamount =  ((totalamount/103)*3).toFixed(2);
   tax_cgst_sgst = ((taxamount / 2)).toFixed(2);
   totalamount_withtax = totalamount - taxamount;
  this.gstForm.controls.taxdet_totalamountoftax.setValue(taxamount);
  this.gstForm.controls.taxdet_taxpercenttage.setValue(3);
  this.gstForm.controls.taxdet_totalamountofsgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.taxdet_totalamountofcgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.taxdet_totalamountaftertax.setValue(Math.round(Number(totalamount_withtax) + Number(taxamount)));
  this.gstForm.controls.taxdet_totalamountbeforetax.setValue(Math.round(totalamount_withtax));  
  this.api.billingarray_incgst.tax_details = this.gstForm.value;

  
}
tabledata(){
  this.taxcalc();
  this.api.billingarray_incgst.tabledatadet = "";
  // console.log(this.getTotalAmount())
  console.log(this.selectedproditem)
  this.dataSource = new MatTableDataSource(this.selectedproditem);
  this.api.billingarray_incgst.tabledatadet =this.selectedproditem;
}
remove(dat){
  // console.log(dat);    
    let index = this.selectedproditem.indexOf(dat);
    if (index > -1) {
      this.selectedproditem.splice(index, 1);
    }
  
  this.tabledata();
}

productCount(){
  this.api.productbillcount().then(res =>{
    console.log(res)
    //  console.log(res['count']);
    //  console.log(res['count']+1);
    // this.sareebillcount = res['count']+1;
    
    this.api.billingarray_incgst.invoiceno = res["count"]+1;
    this.api.billingarray_incgst.invoicedate = (new Date()).toLocaleDateString('en-GB');
    this.api.billingarray_incgst.invoicemonth = (new Date()).getMonth() +1 ;
    this.api.billingarray_incgst.invoiceyear = (new Date()).getFullYear();
    console.log(this.api.billingarray_incgst)
  }).catch(e =>{
    console.log(e)
  })
}

pr0ductbill(){
console.log(this.api.billingarray_incgst)
// return;
this.api.Productbill(this.api.billingarray_incgst).then(res =>{
  console.log(res)
  if(res['status'] == true){
    this.api.snackmsg(res["msg"],"close");
    this.router.navigateByUrl('/includedgstbillpage')
  }
}).catch(e =>{
  console.log(e)
})
}

}
