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
  selector: 'app-sareeproductgst',
  templateUrl: './sareeproductgst.component.html',
  styleUrls: ['./sareeproductgst.component.css']
})
export class SareeproductgstComponent implements OnInit {
  displayedColumns:any = ['position','productname','qty','rate','subtotal','discount','total','Delete'];  
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
  calc_amount:any;
  calc_amount2:Number;
public proditem:any="";
public sareebillcount:any;

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
    this.api.billingarray_sareeprod = {};
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
    this.sareebillcout();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      // console.log(this.dataSource.filter) 
  }

  filtercountry(name: string) {
    return this.country_lis.filter(country => 
      country.customername.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filtercountry2(name: string) {
    return this.country_lis2.filter(country => 
      country.sareecode.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  test(para){  
    this.api.billingarray_sareeprod.customerdetails = "";
    this.api.billingarray_sareeprod.customerdetails = para;
    this.cus_address = para.address
    this.cus_adhaarid =para.adhaarid;
    this.cus_customername = para.customername;
    this.cus_emailid = para.emailid
    this.cus_phonenumber = para.phoneumber
    // console.log(para);

  }
  prod(item){
    this.proditem = "";    
    this.proditem = item;
  }
  getTotalAmount() {   
    return this.productarray.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
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
  console.log(data);
  
    }).catch(err =>{
      // this.api.snackmsg("Hail","close")
    })
  }
  
  sareebillcout(){
    this.api.sareebillcount().then(res =>{
      //  console.log(res['count']);
      //  console.log(res['count']+1);
      // this.sareebillcount = res['count']+1;
      this.api.billingarray_sareeprod.invoiceno = res["count"]+1;
      this.api.billingarray_sareeprod.invoicedate = (new Date()).toLocaleDateString('en-GB');
      this.api.billingarray_sareeprod.invoicemonth = (new Date()).getMonth() +1 ;
      this.api.billingarray_sareeprod.invoiceyear = (new Date()).getFullYear();
      // console.log(this.api.billingarray_sareeprod)
    }).catch(e =>{
      console.log(e)
    })
  }
  
sareebill(){
  console.log(this.api.billingarray_sareeprod)
  this.api.Postsareebill(this.api.billingarray_sareeprod).then(res =>{
    console.log(res)
    if(res['status'] == true){
      this.api.snackmsg(res["msg"],"close");
      this.router.navigateByUrl('/sareebill')
    }
  }).catch(e =>{
    console.log(e)
  })
}

  getsareeproduct(){  
    console.log("calling")
    this.api.Getsareeproduct().then((res:any) =>{    
    if(res.data.length == 0){
       this.api.snackmsg("No Record(s) Found","Close")
    }
    if( res.status == true && res.data.length != 0){
      // console.log(res.data)
      res.data.forEach(element => {
        if(element.sareeqty != 0){
          this.country_lis2.push(element);
        }
      });
    }
}).catch(err =>{
    // this.api.snackmsg("Hail","close")
  })
}


Calculate(){  
  this.calc_amount2 =this.calc_amount - this.getTotalAmount();
}
add() { 
  this.proditem.collected = this.productForm.value;
  this.productForm.value
  this.selectedproditem.push(this.proditem)
this.productForm.reset();
this.tabledata();
   this.proditem= ""
}
taxcalc(){
  this.api.billingarray_sareeprod.tax_details ="";
  let taxamount:any =0;
  let tax_cgst_sgst:any =0;
  let totalamount_withtax:any = 0;
  let totalamount:any = 0;
  this.gstForm.controls.totamt.setValue(this.getTotalAmount());  
  totalamount = this.gstForm.controls.totamt.value
  taxamount =  ((totalamount/105)*5).toFixed(2);
   tax_cgst_sgst = ((taxamount / 2)).toFixed(2);
   totalamount_withtax = totalamount - taxamount;
  this.gstForm.controls.tottaxpercent.setValue(5);
  this.gstForm.controls.taxamt.setValue(taxamount);
  this.gstForm.controls.cgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.sgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.totamtwithtax.setValue(totalamount_withtax);  
  this.gstForm.controls.roundoff.setValue(Math.round(totalamount_withtax));
  this.api.billingarray_sareeprod.tax_details = this.gstForm.value;
  
}
tabledata(){
  this.api.billingarray_sareeprod.tabledatadet = "";
  this.productarray.length =0;
  this.selectedproditem.forEach(item => {
    let total =0;
    total = ((item.collected.qty * item.sareerate) - item.collected.dis);
    item.total = total;
    this.productarray.push(item);
  });
  this.taxcalc();
  this.dataSource = new MatTableDataSource(this.productarray);
  this.api.billingarray_sareeprod.tabledatadet= this.productarray;
  // console.log(this.api.billingarray_sareeprod)
}
remove(dat){
  // console.log(dat);    
    let index = this.selectedproditem.indexOf(dat);
    if (index > -1) {
      this.selectedproditem.splice(index, 1);
    }
  
  this.tabledata();
  this.Calculate()
}

}
