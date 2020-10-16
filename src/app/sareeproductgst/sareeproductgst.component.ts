import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

var ELEMENT_DATA: any = [];
@Component({
  selector: 'app-sareeproductgst',
  templateUrl: './sareeproductgst.component.html',
  styleUrls: ['./sareeproductgst.component.css']
})
export class SareeproductgstComponent implements OnInit {
  displayedColumns:any = ['position','productname','qty','rate','discount','total','Delete'];  
  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  countryCtrl: FormControl;
  productForm: FormGroup;
  gstForm: FormGroup;
  selectedproditem:any=[];
  countryCtrl2: FormControl;
  country_lis:any=[];
  country_lis2:any=[];
  public productarray:any=[];
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

  constructor(public api:ApiService,public formBuilder: FormBuilder) { 
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
    this.api.billingobject = {};
    // window.print()
    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required],
      qty: ['', Validators.required],
      dis: ['', Validators.required],
      // qty: ['', Validators.required]
    
      
  });
  this.gstForm = this.formBuilder.group({
    totamt: ['', Validators.required],
    taxamt: ['', Validators.required],
    tottaxpercent: ['', Validators.required],
    cgsttax: ['', Validators.required],
    sgsttax: ['', Validators.required],
    roundoff: ['', Validators.required],
    totamtwithtax: ['', Validators.required]
  })
    this.getcustomer();
    this.getsareeproduct();
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
      country.sareeproductname.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  test(para){  
    this.api.billingobject.customerdetails = "";
    this.api.billingobject.customerdetails = para;
    this.cus_address = para.address
    this.cus_adhaarid =para.adhaarid;
    this.cus_customername = para.customername;
    this.cus_emailid = para.emailid
    this.cus_phonenumber = para.phoneumber
    console.log(para);

  }
  prod(item){
    // console.log(item)    
    this.proditem = "";    
    this.proditem = item;
    // this.proditem = this.productForm.controls.qty.setValue(0);
    // this.productForm.controls.productname.setValue(item.productname);
    // this.productForm.controls.qty.setValue(0);   
    
  }
  getTotalAmount() {   
    return this.productarray.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  getcustomer(){
    this.api.Getcustomer().then((data:any) =>{
      console.log(data.data.length)
      if(data.data.length == 0){
         this.api.snackmsg("No Record(s) Found","Close")
      }
      if( data.status == true && data.data.length != 0){
        console.log(data)  
        this.country_lis = data.data       
     }
  console.log(data);
  
    }).catch(err =>{
      // this.api.snackmsg("Hail","close")
    })
  }
  getsareeproduct(){  
    this.api.Getsareeproduct().then((res:any) =>{    
    if(res.data.length == 0){
       this.api.snackmsg("No Record(s) Found","Close")
    }
    if( res.status == true && res.data.length != 0){
      this.country_lis2 = res.data   
    }
}).catch(err =>{
    // this.api.snackmsg("Hail","close")
  })
}

add() { 
  this.proditem.collected = this.productForm.value;
  this.productForm.value
  this.selectedproditem.push(this.proditem)
this.productForm.reset();
this.tabledata();
   
}
taxcalc(){
  this.api.billingobject.tax_details_addtional_bill_1 ="";
  let taxamount:any =0;
  let tax_cgst_sgst:any =0;
  let totalamount_withtax = 0;
  let totalamount:any = 0;
  
  this.gstForm.controls.totamt.setValue(this.getTotalAmount());  
  totalamount = this.gstForm.controls.totamt.value
  // console.log(totalamount,"totalamount")
  taxamount =  (totalamount * (0.05)).toFixed(2);
  // console.log(taxamount,"taxamount")
   tax_cgst_sgst = ((taxamount / 2)).toFixed(2);
   totalamount_withtax = (Number(totalamount) + Number(taxamount));
   console.log(totalamount_withtax)
  this.gstForm.controls.tottaxpercent.setValue(5);
  this.gstForm.controls.taxamt.setValue(taxamount);
  this.gstForm.controls.cgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.sgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.totamtwithtax.setValue(totalamount_withtax);  
  this.gstForm.controls.roundoff.setValue(Math.round(totalamount_withtax));
  this.api.billingobject.tax_details_addtional_bill_1 = this.gstForm.value;
  
}
tabledata(){
  this.productarray.length =0;
  this.selectedproditem.forEach(item => {
    let total =0;
    total = ((item.collected.qty * item.sareerate) - item.collected.dis);
    item.total = total;
    this.productarray.push(item);
  });
  this.taxcalc();
  // this.api.billingobject.tabledatadet = "";
  // console.log(this.getTotalAmount())
  // console.log(this.selectedproditem)
  this.dataSource = new MatTableDataSource(this.productarray);
  // this.api.billingobject.tabledatadet =this.selectedproditem;
}
remove(dat){
  // console.log(dat);    
    let index = this.selectedproditem.indexOf(dat);
    if (index > -1) {
      this.selectedproditem.splice(index, 1);
    }
  
  this.tabledata();
}

}
