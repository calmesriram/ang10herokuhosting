import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

var ELEMENT_DATA: any = [];
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: any = ['productname', 'date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productForm: FormGroup;
  constructor(public api: ApiService, public formBuilder: FormBuilder) { }
  // profileForm:FormControl
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required],
      grams: ['', Validators.required],
      ProdandGram: ['', Validators.required],
      date: ['', Validators.required]

    });

    this.getproduct();
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

  getTotalCost() {
    // return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  getproduct() {
    this.dataSource = new MatTableDataSource();
    this.api.Getproduct().then((data: any) => {
      console.log(data.data.length)
      if (data.data.length == 0) {
        this.api.snackmsg("No Record(s) Found", "Close")
      }
      if (data.status == true && data.data.length != 0) {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.data);
      }
      console.log(data);

    }).catch(err => {
      // this.api.snackmsg("Hail","close")
    })
  }

  onSubmit() {
    this.productForm.controls.date.setValue((new Date()).toLocaleDateString('en-GB'));
    this.productForm.controls.ProdandGram.setValue(this.productForm.value.productname + "" + this.productForm.value.grams);
    console.log(this.productForm.value)
    if (this.productForm.value.productname == "") {
      this.api.snackmsg("Enter The Product Name", "close")
      return;
    }
    this.api.Postproduct(this.productForm.value).then((data)=>{
      console.log(data)
      this.getproduct();
      this.productForm.reset();
    }).catch(e =>{
      console.log(e)
      this.getproduct();
    })

  }
}
