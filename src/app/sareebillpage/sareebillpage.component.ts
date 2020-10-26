import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
// import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

declare var require: any;    
// var $ = require("jquery");
const numberWords = require('number-words');
 
//=> 'one hundred and one'
 
@Component({
  selector: 'app-sareebillpage',
  templateUrl: './sareebillpage.component.html',
  styleUrls: ['./sareebillpage.component.css']
})
export class SareebillpageComponent implements OnInit {
rupessinwords:any;
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    
    // this.api.billingarray_sareeprod = {"invoiceno":72,"invoicedate":"10/26/2020","customerdetails":{"_id":"5f893afd4a8eb2001728f72b","customername":"santhoush ","phoneumber":"12345679","address":"salem,tamilnadu,india,south india","emailid":"san@gamil.com","adhaarid":"21365480","date":"2020-10-18T18:30:00.000Z","customerid":"jbxgKwLw4","__v":0},"tabledatadet":[{"_id":"5f8d33a614712100171d0c80","sareeproductname":"demo","sareeqty":450,"sareerate":1350,"sareecode":"555","sareehsncode":"8245","date":"2020-10-22T18:30:00.000Z","sareeproductid":"KuyjqOlhv","__v":0,"collected":{"productname":"555","qty":10,"dis":23},"total":13477}],"tax_details":{"totamt":13477,"taxamt":"641.76","tottaxpercent":5,"cgsttax":"320.88","sgsttax":"320.88","roundoff":12835,"totamtwithtax":12835.24}}
    this.rupessinwords = numberWords.convert(this.api.billingarray_sareeprod.tax_details.totamt)
    // console.log(this.rupessinwords)
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
    // let printContents, popupWin;
    // printContents = document.getElementById('example').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
    // popupWin.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    // popupWin.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
    // popupWin.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
    // popupWin.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
    // popupWin.document.write(printContents);
    // popupWin.document.close();

    var printlme = document.getElementById("example");
    var wme = window.open("","","width=900,height=700,toolbar=0,scrollbars=0,status=0,top=0,left=0,height=100%,width=auto");
    wme.document.open();
    
    wme.document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
    wme.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    wme.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
    wme.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
    wme.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');
    wme.document.write(printlme.innerHTML);
    // wme.document.write(printlme.outerHTML);
    wme.document.close();
    wme.focus();
    wme.print();
    // wme.close();
  }

}
