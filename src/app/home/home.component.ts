import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public sareebillcount=0;
public sareeproductcount=0;
public customercount=0;
public productcount=0;
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.api.sareebillcount().then(res =>{
      // console.log(res['count']);
      this.sareebillcount = res['count'];
    }).catch(e =>{
      console.log(e)
    })
    this.api.Sareeproductcount().then(res =>{
      // console.log(res['count']);
      this.sareeproductcount = res['count'];
    }).catch(e =>{
      console.log(e)
    })
    this.api.Customercount().then(res =>{
      // console.log(res['count']);
      this.customercount = res['count'];
    }).catch(e =>{
      console.log(e)
    })
    this.api.Productcount().then(res =>{
      // console.log(res['count']);
      this.productcount = res['count'];
    }).catch(e =>{
      console.log(e)
    })
  }

}
