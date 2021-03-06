import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

var ELEMENT_DATA: any = [];
var ELEMENT_DATA2: any = [];

@Component({
  selector: 'app-sareeproductpage',
  templateUrl: './sareeproductpage.component.html',
  styleUrls: ['./sareeproductpage.component.css']
})
export class SareeproductpageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: any = ['sno', 'sareeproductname', 'sareecode', 'sareeqty', 'sareerate', 'update', 'delete'];
  // customertable;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
  btnhideshow: Boolean;
  loader: boolean;
  pcodedisable: Boolean;
  sareesForm: FormGroup;
  constructor(private dialog: MatDialog, public api: ApiService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sareesForm = this.formBuilder.group({
      sareeproductname: ['', Validators.required],
      sareeqty: ['', Validators.required],
      sareerate: ['', Validators.required],
      sareecode: ['', Validators.required],
      // sareehsncode:['', Validators.required],
      date: ['', Validators.required]
    });

    this.getsareeproduct();
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

  getsareeproduct() {
    this.api.Getsareeproduct().then((data: any) => {
      console.log(data.data.length)
      if (data.data.length == 0) {
        this.api.snackmsg("No Record(s) Found", "Close")
      }
      if (data.status == true && data.data.length != 0) {
        console.log(data)
        let lowqtyproduct: any = [];
        let qtyproduct: any = [];

        data.data.forEach(async (items) => {
          if (await items.sareeqty == 0) {
            lowqtyproduct.push(items)
          } else {
            qtyproduct.push(items)
          }
        });
        // this.btnhideshow = false;
        this.dataSource = new MatTableDataSource(qtyproduct);
        this.dataSource2 = new MatTableDataSource(lowqtyproduct);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource2.sort = this.sort;
        });
      }
      console.log(data);

    }).catch(err => {
      // this.btnhideshow = false;
      // this.api.snackmsg("Hail","close")
    })
  }

  onSubmit() {

    if (this.sareesForm.value.sareeproductname == "") {
      this.api.snackmsg("Please fill all the fields", "close");
      return;
    }
    this.sareesForm.controls.date.setValue((new Date()).toLocaleDateString('en-GB'));
    if (this.sareesForm.value.sareeproductname == null || this.sareesForm.value.sareeproductname == "" &&
      this.sareesForm.value.sareeqty == null || this.sareesForm.value.sareeqty == "" &&
      this.sareesForm.value.sareerate == null || this.sareesForm.value.sareerate == "" &&
      this.sareesForm.value.sareecode == null || this.sareesForm.value.sareecode == "" &&
      this.sareesForm.value.date == null || this.sareesForm.value.date == ""
      // this.sareesForm.value.sareehsncode == null || this.sareesForm.value.sareehsncode == ""
    ) {
      this.api.snackmsg("Please fill all the fields", "close");
      return;
    } else {
      this.loader = true;
      this.api.Postsareeproduct(this.sareesForm.value).then((data) => {
        // console.log(data)
        this.loader = false;
        this.getsareeproduct();
        this.sareesForm.reset();
        this.api.snackmsg(data["msg"], "close");

      }).catch(e => {
        this.loader = false;
        console.log(e)
        this.api.snackmsg(e, "close");
        this.getsareeproduct();
      })
    }

  }
  Cancel() {
    this.btnhideshow = false;
    this.sareesForm.reset();
    this.pcodedisable = false;
  }


  Delete(para) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: para
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result == "Yes") {
        this.btnhideshow = false;
        this.loader = true;
        this.api.Deletesareeproduct(para.sareecode).then(res => {
          this.loader = false;
          if (res["status"] == true) {
            this.getsareeproduct();
            this.api.snackmsg(res["msg"], "close");
          }
        }).catch(e => {
          this.loader = false;
          this.api.snackmsg(e, "close");
        })
      } else {
        return;
      }
    });

  }
  loaddata(para) {
    this.sareesForm.controls.sareecode.disable;
    this.btnhideshow = true;
    this.pcodedisable = true;
    this.sareesForm.controls.sareeproductname.setValue(para.sareeproductname);
    this.sareesForm.controls.sareeqty.setValue(para.sareeqty);
    this.sareesForm.controls.sareerate.setValue(para.sareerate);
    this.sareesForm.controls.sareecode.setValue(para.sareecode);
    // this.sareesForm.controls.sareehsncode.setValue(para.sareehsncode);
    this.sareesForm.controls.date.setValue(para.date);
  }
  Update() {
    this.loader = true;
    console.log(this.sareesForm.value, this.sareesForm.controls.sareecode.value)
    this.api.Putsareeproduct(this.sareesForm.value, this.sareesForm.controls.sareecode.value).then(res => {
      // console.log(res)
      this.loader = false;
      if (res['status'] == true) {
        this.api.snackmsg(res["msg"], "close");
        this.btnhideshow = false;
        this.pcodedisable = false;
        this.getsareeproduct();
        this.sareesForm.reset();
      }
    }).catch(e => {
      this.loader = false;
      console.log(e)
      this.api.snackmsg(e, "close");
      this.btnhideshow = false;
      this.pcodedisable = false;
      this.getsareeproduct();
    })
  }
}
