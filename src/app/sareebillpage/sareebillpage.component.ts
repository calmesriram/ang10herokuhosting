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
dateandtime:any;
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    
this.dateandtime = (new Date()).toLocaleDateString('en-GB')+" & "+(new Date()).toLocaleTimeString('en-US');
    // this.api.billingarray_sareeprod = {"invoiceno":10,"invoicedate":"28/10/2020","invoicemonth":10,"invoiceyear":2020,"customerdetails":{"_id":"5f9929b05945cf73c433ad71","customername":"test","phoneumber":"12549780","address":"12349894asdfja; sdjfa;sdjf","emailid":"test@gmail.com","adhaarid":"2136548970","date":"28/10/2020","partygstin":"153264897","customerid":"CvsqxQBQf","__v":0},"tabledatadet":[{"_id":"5f97f132d12bc400171b9f25","sareeproductname":"GULABA CHUDI","sareeqty":11,"sareerate":665,"sareecode":"DT860","sareehsncode":"-","date":null,"sareeproductid":"9E10X8DC8","__v":0,"collected":{"productname":"DT860","qty":1,"dis":0},"total":665}],"tax_details":{"totamt":665,"taxamt":"31.67","tottaxpercent":5,"cgsttax":"15.84","sgsttax":"15.84","roundoff":633,"totamtwithtax":633.33}}
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
