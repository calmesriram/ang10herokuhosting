import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sareebillcount = 0;
  public sareeproductcount = 0;
  public customercount = 0;
  public productcount = 0;
  public productbillcount = 0;
  loader: boolean;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.loader = true;
    this.api.sareebillcount().then(res => {
      console.log(res);
      // console.log(res['count']);
      this.loader = false;
      this.sareebillcount = res['count'];
    }).catch(e => {
      this.loader = false;
      console.log(e)
    })
    this.api.Sareeproductcount().then(res => {
      console.log(res);
      // console.log(res['count']);
      this.loader = false;
      this.sareeproductcount = res['count'];
    }).catch(e => {
      this.loader = false;
      console.log(e)
    })
    this.api.Customercount().then(res => {
      console.log(res);
      // console.log(res['count']);
      this.loader = false;
      this.customercount = res['count'];
    }).catch(e => {
      this.loader = false;
      console.log(e)
    })
    this.api.Productcount().then(res => {
      console.log(res);
      this.loader = false;
      this.productcount = res['count'];
    }).catch(e => {
      this.loader = false;
      console.log(e)
    })
    this.api.productbillcount().then(res => {
      console.log(res);
      // console.log(res['count']);
      this.loader = false;
      this.productbillcount = res['count'];
    }).catch(e => {
      this.loader = false;
      console.log(e)
    })
  }

}
