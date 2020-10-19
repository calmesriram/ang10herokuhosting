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
    
    // this.api.billingarray_sareeprod = {"customerdetails":{"_id":"5f893afd4a8eb2001728f72b","customername":"santhoush ","phoneumber":"12345679","address":"salem,tamilnadu,india,south india","emailid":"san@gamil.com","adhaarid":"21365480","date":"2020-10-18T18:30:00.000Z","customerid":"jbxgKwLw4","__v":0},"tabledatadet":[{"_id":"5f8d33a614712100171d0c80","sareeproductname":"demo","sareeqty":500,"sareerate":1350,"sareecode":"555","sareehsncode":"8245","date":"2020-10-22T18:30:00.000Z","sareeproductid":"KuyjqOlhv","__v":0,"collected":{"productname":"555","qty":1,"dis":25},"total":1325},{"_id":"5f8d248ce9a1a82f242873f9","sareeproductname":"silk","sareeqty":10,"sareerate":50,"sareecode":"silk100","sareehsncode":"HSN001","date":"2020-10-16T18:30:00.000Z","sareeproductid":"A2Jz8bsMq","__v":0,"collected":{"productname":"silk100","qty":2,"dis":0},"total":100}],"tax_details":{"totamt":1425,"taxamt":"67.86","tottaxpercent":5,"cgsttax":"33.93","sgsttax":"33.93","roundoff":1357,"totamtwithtax":1357.14}}
    // console.log(    this.api.billingarray_sareeprod ,"**********")
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
  
  // wme.document.write('<link rel="stylesheet" href="../../assets/jsandcss/bs4.5.2.css">');
  //   wme.document.write('<script src="../../assets/jsandcss/jqyery.min.3.5.1.js"></script>');
  //   wme.document.write('<script src="../../assets/jsandcss/ajax.proper.min.js"></script>');
  //   wme.document.write('<script src="../../assets/jsandcss/bootstrap.min.4.5.2.js"></script>');
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
