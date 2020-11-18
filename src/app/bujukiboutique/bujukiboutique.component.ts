import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-bujukiboutique',
  templateUrl: './bujukiboutique.component.html',
  styleUrls: ['./bujukiboutique.component.css']
})
export class BujukiboutiqueComponent implements OnInit {
  customerForm: FormGroup;
  custormerdetails:any=[];
  constructor(public formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      no: ['', Validators.required],
      date: ['', Validators.required],
      customername: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      lining: ['', Validators.required],
      falls: ['', Validators.required],
      sareeoralfalls: ['', Validators.required],
      mudi: ['', Validators.required],
      embroidarywork: ['', Validators.required],
      aariwork: ['', Validators.required],
      chudi: ['', Validators.required],
      blouse: ['', Validators.required],
      amount: ['', Validators.required]

    });

    this.custormerdetails = {"no":"10","date":"2020-11-17T18:30:00.000Z","customername":"santhoush","mobilenumber":"987486120","lining":"50","falls":"20","sareeoralfalls":"10","mudi":"0","embroidarywork":"15","aariwork":"0","chudi":"350","blouse":"0","amount":"550"}
    console.log(this.custormerdetails)
    // console.log(this.customerForm.value.date).toLocaleDateString('en-GB')+" & "+(this.customerForm.value.date).toLocaleTimeString('en-US');
  }
  Submit() {
    this.custormerdetails.length = 0;    
    this.custormerdetails = this.customerForm.value;
    console.log(this.custormerdetails);
  }

  clear(){
    this.customerForm.reset();
    this.custormerdetails.length = 0;
  }

}
