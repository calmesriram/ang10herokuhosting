import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
public baseurl:String= "https://jwlserver.herokuapp.com"
// public baseurl:String= "http://localhost:3000"
public billingobject:any={
  customerdetails:[],
  tabledatadet:[],
  tax_details_addtional_bill_1:[],
  invoiceno:String,
invoicedate:String
};
public billingarray_sareeprod:any={
  customerdetails:[],
  tabledatadet:[],
  tax_details:[],
  invoiceno:String,
invoicedate:String,
invoicemonth:String,
  invoiceyear:String
};
public billingarray_incgst:any={
  customerdetails:[],
  tabledatadet:[],
  tax_details:[],
  invoiceno:String,
invoicedate:String,
invoicemonth:String,
  invoiceyear:String,
  taxdet_role:"includedgst"
};
public billingarray_nonincgst:any={
  customerdetails:[],
  tabledatadet:[],
  tax_details:[],
  invoiceno:String,
invoicedate:String,
invoicemonth:String,
  invoiceyear:String,
  taxdet_role:"nonincludednon"
};

  constructor(public _snackBar: MatSnackBar,public http: HttpClient,public spinner: NgxSpinnerService    ) {
    this.createOnline$().subscribe(isOnline => {
      // console.log(isOnline);
      if (isOnline == true) {
        this.spinner.hide();
      }
      if (isOnline == false) {
        this.spinner.show();
      }
    });
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
  Postcustomer(data){
    return new Promise((resolve,reject) => {
      this.http.post(this.baseurl+"/Customer",data).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

Getcustomer(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Customer").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}

Getsareeproduct(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Saree").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
sareebillcount(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Sareebillcount").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
productbillcount(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Bill").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Sareeproductcount(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Sareeproductcount").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Customercount(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Customercount").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Productcount(){
  return new Promise((resolve,reject) => {
    this.http.get(this.baseurl+"/Productcount").subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}

Postsareeproduct(data){
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Saree",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Putsareeproduct(data,sareecode){
  return new Promise((resolve,reject) => {
    this.http.put(this.baseurl+"/Saree/"+sareecode,data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Deletesareeproduct(sareecode){
  return new Promise((resolve,reject) => {
    this.http.delete(this.baseurl+"/Saree/"+sareecode).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
Postsareebill(data){
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Sareebill",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}

Productbill(data){
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Productbill",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}
// GetcustomerbyId(id){
//   return new Promise((resolve,reject) => {
//     this.http.get(this.baseurl+"/Customer/"+id).subscribe(res => {
//       resolve(res);
//     }, err => {
//       resolve(err);
//     })
//   })
// }

Postproduct(data){
  return new Promise((resolve,reject) => {
    this.http.post(this.baseurl+"/Product",data).subscribe(res => {
      resolve(res);
    }, err => {
      resolve(err);
    })
  })
}

Getproduct(){
return new Promise((resolve,reject) => {
  this.http.get(this.baseurl+"/Product").subscribe(res => {
    resolve(res);
  }, err => {
    resolve(err);
  })
})
}

// GetproductbyId(id){
// return new Promise((resolve,reject) => {
//   this.http.get(this.baseurl+"/Product/"+id).subscribe(res => {
//     resolve(res);
//   }, err => {
//     resolve(err);
//   })
// })
// }

  snackmsg(message: string, action ?: string){
    
      this._snackBar.open(message, action, {
        duration: 5000,
      });
    }

  
  
}
