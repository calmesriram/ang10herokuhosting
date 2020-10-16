import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// declare var require: any;    
// var $ = require("jquery");
@Component({
  selector: 'app-sareebillpage',
  templateUrl: './sareebillpage.component.html',
  styleUrls: ['./sareebillpage.component.css']
})
export class SareebillpageComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    console.log(this.api.billingobject,"**********")

    // this.api.billingobject = {"customerdetails":{"_id":"5f817a5673936c0ec00d3280","customername":"santhoush","phoneumber":"1234567890","address":"salme","emailid":"san@gmail.com","adhaarid":"11559922663","date":"2020-10-09T18:30:00.000Z","customerid":"o0qZ92uyM","__v":0},"tax_details_addtional_bill_1":{"totamt":6000,"taxamt":180,"tottaxpercent":3,"cgsttax":90,"sgsttax":90,"roundoff":6180,"totamtwithtax":6180},"tabledatadet":[{"_id":"5f817b5573936c0ec00d3282","productname":"100g kuthuvilaku","date":"2020-10-01T18:30:00.000Z","productid":"5yOB3akzF","__v":0,"rate":5000},{"_id":"5f817b7873936c0ec00d3284","productname":"24 coin","date":"2020-10-01T18:30:00.000Z","productid":"jfIqLG1qI","__v":0,"rate":1000}]}
//     $.noConflict();

//     $(document).ready(function() {
//     $('#example').DataTable( {
//         dom: 'Bfrtip',
//         buttons: [
//             'copy', 'csv', 'excel', 'pdf', 'print'
//         ]
//     } );
// } );
  }

  printdata(){
    var printlme = document.getElementById("example");
    var wme = window.open("","","width=900,height=700");
  // wme.document.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
  // wme.document.write('<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">');
  // wme.document.write('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
    wme.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    wme.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
    wme.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
    wme.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
    wme.document.write(printlme.outerHTML);
    wme.document.close();
    // wme.focus();
    wme.print();
    // wme.close();
  }

}
