import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
var ELEMENT_DATA: any = [];

@Component({
  selector: 'app-nonincludedgst',
  templateUrl: './nonincludedgst.component.html',
  styleUrls: ['./nonincludedgst.component.css']
})
export class NonincludedgstComponent implements OnInit {
  displayedColumns:any = ['position','productname','Delete'];    
  dataSource = new MatTableDataSource(ELEMENT_DATA);  
  countryCtrl: FormControl;
  productForm: FormGroup;
  gstForm: FormGroup;
  selectedproditem:any=[];  
  cust_details_table:any= [];
  prod_details_table:any = [];
  cus_address:any;
  cus_adhaarid:any;
  cus_customername:any;
  cus_emailid:any;
  cus_phonenumber:any; 
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  proditem;
  public totamtModel:any=0;
  public onegramNgModel:any ="";
  keyword = "productname";
  keyword2 ="customername";
  productdetails:any = [];
  custormerdetails:any =[];


  constructor(public api:ApiService,public formBuilder: FormBuilder,public router:Router) { }

  ngOnInit() {
    this.api.billingarray_incgst = {};
    this.api.billingarray_nonincgst = {};
    this.api.billingarray_nonincgst.taxdet_role="nonincludedgst";
    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required]   
      
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
  }
  selectedproduct(item) {
    this.prod_details_table.length = 0;
    this.prod_details_table = item;
    this.proditem = "";    
    this.proditem = item;
    this.productForm.controls.productname.setValue(item.productname);
  }
  selectedcustomer(para){
    this.cust_details_table.length = 0;
    this.cust_details_table = para;
    this.api.billingarray_nonincgst.customerdetails = "";
    this.api.billingarray_nonincgst.customerdetails = para;
    this.cus_address = para.address
    this.cus_adhaarid =para.adhaarid;
    this.cus_customername = para.customername;
    this.cus_emailid = para.emailid
    this.cus_phonenumber = para.phoneumber
  }
  getTotalAmount() {   
    return this.selectedproditem.map(t => t.rate).reduce((acc, value) => acc + value, 0);
  }
  getcustomer(){
    this.api.Getcustomer().then((data:any) =>{
      if(data.data.length == 0){
         this.api.snackmsg("No Record(s) Found","Close")
      }
      if( data.status == true && data.data.length != 0){
        this.custormerdetails.length = 0;
        this.custormerdetails = data.data;
     } 
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
      this.productdetails.length = 0;
      this.productdetails = data.data
    }
}).catch(err =>{
    // this.api.snackmsg("Hail","close")
  })
}

add() { 
this.selectedproditem.push(this.proditem);
  this.productForm.reset();
this.tabledata();   
}
taxcalc(){
  this.api.billingarray_nonincgst.tax_details ="";
  let taxamount =0;
  let tax_cgst_sgst =0;
  let totalamount_withtax = 0;
  let totalamount = 0;
  totalamount = this.totamtModel;
  this.gstForm.controls.taxdet_totalamountbeforetax.setValue(0);
  taxamount = (totalamount * (0.03));
   tax_cgst_sgst = (taxamount / 2);
   totalamount_withtax = totalamount + taxamount;
   this.gstForm.controls.taxdet_taxpercenttage.setValue(3);
   this.gstForm.controls.taxdet_totalamountoftax.setValue(taxamount);
   this.gstForm.controls.taxdet_totalamountofsgsttax.setValue(tax_cgst_sgst);
   this.gstForm.controls.taxdet_totalamountofcgsttax.setValue(tax_cgst_sgst);
  this.gstForm.controls.taxdet_totalamountaftertax.setValue(Math.round(Number(totalamount_withtax)));
  this.gstForm.controls.taxdet_totalamountbeforetax.setValue(Math.round(totalamount));
  this.api.billingarray_nonincgst.tax_details = this.gstForm.value;
  
}
tabledata(){
  this.taxcalc();
  this.api.billingarray_nonincgst.tabledatadet = "";
  this.dataSource = new MatTableDataSource(this.selectedproditem);
  this.api.billingarray_nonincgst.tabledatadet =this.selectedproditem;
}
remove(dat){
    let index = this.selectedproditem.indexOf(dat);
    if (index > -1) {
      this.selectedproditem.splice(index, 1);
    }
  
  this.tabledata();
}

productCount(){  
  this.api.productbillcount().then(res =>{
    this.api.billingarray_nonincgst.invoiceno = res["count"]+1;
    this.api.billingarray_nonincgst.invoicedate = (new Date()).toLocaleDateString('en-GB');
    this.api.billingarray_nonincgst.invoicemonth = (new Date()).getMonth() +1 ;
    this.api.billingarray_nonincgst.invoiceyear = (new Date()).getFullYear();
  }).catch(e =>{
    console.log(e)
  })
}

pr0ductbill(){
  this.api.billingarray_nonincgst.onegramsilverrate = "";
  this.api.billingarray_nonincgst.onegramsilverrate = this.onegramNgModel; 

  if(this.selectedproditem.length != 0){
    console.log(this.api.billingarray_nonincgst)
    this.api.Productbill(this.api.billingarray_nonincgst).then(res =>{
      console.log(res)
      if(res['status'] == true){
        this.api.snackmsg(res["msg"],"close");
        this.router.navigateByUrl('/nonincludedgstbillpage')
      }
    }).catch(e =>{
      console.log(e)
    })
  }else{
    this.api.snackmsg("Please add Least one","close");
    return;
  }
  

}


}
