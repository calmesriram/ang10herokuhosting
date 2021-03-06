import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];
var ELEMENT_DATA3: any = [];
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: any = ['sno', 'update', 'delete', 'customername', 'phoneumber', 'adhaarid', 'partygstin', 'address', 'emailid'];
  displayedColumnssilver: any = ['productname', 'date'];
  displayedColumnssaree: any = ['sno', 'update', 'delete', 'customername', 'phoneumber', 'adhaarid', 'partygstin', 'address', 'emailid'];
  updatebtn: boolean;
  loader: boolean;
  customerdet_id: String = "";
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  silverdataSource = new MatTableDataSource(ELEMENT_DATA2);
  sareedataSource = new MatTableDataSource(ELEMENT_DATA3);

  @ViewChild(MatSort) sort: MatSort;

  customerForm: FormGroup;
  constructor(private dialog: MatDialog, public api: ApiService, public formBuilder: FormBuilder) { }
  // profileForm:FormControl
  ngOnInit(): void {
    // this.dataSource.sort = this.sort;

    this.customerForm = this.formBuilder.group({
      customername: ['', Validators.required],
      phoneumber: ['', Validators.required],
      emailid: ['', Validators.required],
      adhaarid: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      partygstin: ['', Validators.required]
    });

    this.getcustomer();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  silverapplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    // return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  getcustomer() {
    this.api.Getcustomer().then((data: any) => {
      if (data.data.length == 0) {
        this.api.snackmsg("No Record(s) Found", "Close");
        return;
      }
      if (data.status == true && data.data.length != 0) {
        this.dataSource = new MatTableDataSource(data.data);
        // setTimeout(() => {
        // console.log(this.sort) //not undefined
        this.dataSource.sort = this.sort;
        // })
      }
    }).catch(err => {
      console.log(err)
      // this.api.snackmsg("Hail","close")
    })
  }
  onSubmit() {
    this.loader = true;
    this.customerForm.controls.date.setValue((new Date()).toLocaleDateString('en-GB'));

    console.warn(this.customerForm.value);
    // return;
    this.api.Postcustomer(this.customerForm.value).then((data) => {
      this.loader = false;
      // console.log(data)
      this.getcustomer();
      if (data['status'] == true) {
        this.api.snackmsg(data["msg"], "close");
        this.customerForm.reset();
      }
    }).catch(e => {
      this.loader = false;
      console.log(e)
      this.getcustomer();
    })

  }
  selectedcustomer(data) {
    this.updatebtn = true;
    this.customerdet_id = "";
    this.customerdet_id = data.customerid;
    this.customerForm.controls.customername.setValue(data.customername);
    this.customerForm.controls.phoneumber.setValue(data.phoneumber);
    this.customerForm.controls.emailid.setValue(data.emailid);
    this.customerForm.controls.adhaarid.setValue(data.adhaarid);
    this.customerForm.controls.address.setValue(data.address);
    this.customerForm.controls.partygstin.setValue(data.partygstin);
    return;
  }
  updatecustomer() {
    this.loader = true;
    this.api.Putupdatecustomer(this.customerForm.value, this.customerdet_id)
      .then(res => {
        this.loader = false;
        this.getcustomer();
        if (res['status'] == true) {
          this.api.snackmsg(res["msg"], "close");
          this.customerForm.reset();
        }
      })
      .catch(e => {
        this.loader = false;
        console.log(e)
        this.getcustomer();
      })
  }
  deletecustomer(data) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result == "Yes") {
        this.loader = true;
        this.api.deletecustomer(data.customerid)
          .then(res => {
            this.loader = false;
            this.getcustomer();
            if (res['status'] == true) {
              this.api.snackmsg(res["msg"], "close");
            }
          })
          .catch(e => {
            this.loader = false;
            console.log(e)
            this.getcustomer();
          })
      } else {
        return;
      }
    });


    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed',result);
    //   if(result == "Yes"){

    //   } 
    // });  

  }
  cancle() {
    this.customerdet_id = "";
    this.customerForm.reset();
    this.updatebtn = false;
    return;
  }
}



    // let d = { "name": "Amar" };
    // this.api.Postbilldetailbycustname(d).then(res => {
    //   // console.log(res)
    //   let temp = [];
    //   let count = 0;
    //   if (res['status'] == true && res['data'].length != 0) {
    //     res['data'].forEach(async element => {
    //       await element.tabledatadet.forEach(async data => {
    //         console.log(await data)
    //         temp = (await data)
    //       });
    //       count++;
    //     });
    //     // console.log(count)
    //   }
    //   if (res["data"].length == count) {

    //     // console.log("array", temp)
    //   }

    // }).catch(e => {
    //   console.log(e)
    // })
    // this.api.Postsareebilldetailbycustname(d).then(res => {
    //   console.log(res)
    // }).catch(e => {
    //   console.log(e)
    // })