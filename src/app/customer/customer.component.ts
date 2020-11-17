import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];
var ELEMENT_DATA3: any = [];
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns:any = ['customername', 'phoneumber','adhaarid','partygstin','address','emailid'];
  displayedColumnssilver:any = ['productname', 'date'];
  displayedColumnssaree:any = ['customername', 'phoneumber','adhaarid','partygstin','address','emailid'];

  // customertable;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  silverdataSource = new MatTableDataSource(ELEMENT_DATA2);
  sareedataSource = new MatTableDataSource(ELEMENT_DATA3);  
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  
  customerForm: FormGroup;
  constructor(public api:ApiService,public formBuilder: FormBuilder) { }
  // profileForm:FormControl
  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customername: ['', Validators.required],
      phoneumber: ['', Validators.required],
      emailid: ['', Validators.required],
      adhaarid: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      partygstin:['',Validators.required]     
  });

    this.getcustomer();
    let d = {"name":"Amar"};
    this.api.Postbilldetailbycustname(d).then(res =>{
  console.log(res)
  let temp = [];
  let count =0;
  if(res['status']== true){
    res['data'].forEach(async element => {
      // for(let i=0;i<=await element.tabledatadet;i++){
        //   temp.push(await element.tabledatadet [i])
        // }
        await element.tabledatadet.forEach(async data => {
          console.log(await data)
          temp = (await data)
          // this.silverdataSource = new MatTableDataSource(await data);        
        });
        count++;
    });
    console.log(count)
  }
  if(res["data"].length == count){

    console.log("array",temp)
  }

    }).catch(e =>{
      console.log(e)
    })
    this.api.Postsareebilldetailbycustname(d).then(res =>{
      console.log(res)
        }).catch(e =>{
          console.log(e)
        })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter) 
  }
  silverapplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;       
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log(this.dataSource.filter) 
  }
  
  getTotalCost() {
    // return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
getcustomer(){
  this.api.Getcustomer().then((data:any) =>{
    // console.log(data.data.length)
    if(data.data.length == 0){
       this.api.snackmsg("No Record(s) Found","Close")
    }
    if( data.status == true && data.data.length != 0){
      // console.log(data)
      // this.customertable = data.data
      this.dataSource = new MatTableDataSource(data.data);
   }
// console.log(data);

  }).catch(err =>{
    // this.api.snackmsg("Hail","close")
  })
}

onSubmit() {
  this.customerForm.controls.date.setValue((new Date()).toLocaleDateString('en-GB'));

  console.warn(this.customerForm.value);
  // return;
  this.api.Postcustomer(this.customerForm.value).then((data)=>{
    console.log(data)
    this.getcustomer();
  if(data['status'] == true){
    this.api.snackmsg(data["msg"],"close");
    this.customerForm.reset();
  }
  }).catch(e =>{
    console.log(e)
    this.getcustomer();
  })
  
}
}



