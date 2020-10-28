import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// declare var require: any;    
// var $ = require("jquery");

declare var require: any;    
// var $ = require("jquery");
const numberWords = require('number-words');
@Component({
  selector: 'app-includedgstbillpage',
  templateUrl: './includedgstbillpage.component.html',
  styleUrls: ['./includedgstbillpage.component.css']
})
export class IncludedgstbillpageComponent implements OnInit {
  dateandtime:any;
rupessinwords:any;
constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.dateandtime = (new Date()).toLocaleDateString('en-GB')+" & "+(new Date()).toLocaleTimeString('en-US');
    // console.log(this.dateandtime)
    
    // this.api.billingarray_incgst = {"invoiceno":1,"invoicedate":"27/10/2020","invoicemonth":10,"invoiceyear":2020,"customerdetails":{"_id":"5f893afd4a8eb2001728f72b","customername":"santhoush ","phoneumber":"12345679","address":"salem,tamilnadu,india,south india","emailid":"san@gamil.com","adhaarid":"21365480","date":"2020-10-18T18:30:00.000Z","customerid":"jbxgKwLw4","__v":0},"tax_details":{"taxdet_totalamountbeforetax":5825,"taxdet_totalamountaftertax":6000,"taxdet_totalamountoftax":"174.76","taxdet_totalamountofsgsttax":"87.38","taxdet_totalamountofcgsttax":"87.38","taxdet_taxpercenttage":3},"tabledatadet":[{"_id":"5f893b2f4a8eb2001728f72d","productname":"Silver 100g","date":"2020-10-15T18:30:00.000Z","productid":"KJOrUVSWb","__v":0},{"_id":"5f893b424a8eb2001728f72f","productname":"glod 24 1g","date":"2020-10-15T18:30:00.000Z","productid":"8JMsl004c","__v":0}]}
    this.rupessinwords = numberWords.convert(this.api.billingarray_incgst.tax_details.taxdet_totalamountaftertax)
    console.log(this.api.billingarray_incgst,"**********")
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
