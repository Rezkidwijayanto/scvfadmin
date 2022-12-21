import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { StandardFunction } from '../Function/Standard';

import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private encrypt: EncryptService, private router: Router) {
  }
  
  loginAuth(credentials: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8 ');
    var login = {userid:credentials.sesaid,password:credentials.pass} 
    this.http.post<any>(StandardFunction.apilink + "MstUsers/login",login, { headers }).subscribe({
      next: data => {  
        if (data.jwtkey != undefined) {
          var object = {
            value: data.jwtkey,
            timestamp: new Date().getTime(),
            userid: data.sesaid,
            name: data.nmemp,
            plant: data.plant,
            level: data.level,
            deptlist:data.deptlist,
            category: data.category,
            email: data.mail,
            islogin: 'true'
          } 
          this.encrypt.storagesetJsonValue("SCVFLogin", JSON.stringify(object));
          let expirationdate = object.timestamp + (60 * 60 * 1000);
          var expdata = {
            date: new Date(),
            exptime: expirationdate
          }
          this.encrypt.storagesetJsonValue("SCVFLoginexp", JSON.stringify(expdata));
          this.autologout(expirationdate - object.timestamp);
          Swal.fire({
            title: 'Success!',
            text: 'Login Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            AppComponent.isLoggin.next(true);
            /* Read more about isConfirmed, isDenied below */
           
          })

        }
        else {
          Swal.fire({
            title: 'Warning!',
            text: "Can't generate your session ! Please contact system administrator !",
            icon: 'warning',
            confirmButtonText: 'Ok'
          }).then((result) => {
            AppComponent.isLoggin.next(false);
            this.router.navigate(["/login"]);
          })

        }
      },
      error: error => {
        Swal.fire({
          title: 'Warning!',
          text: "Userid or password not found !",
          icon: 'warning',
          confirmButtonText: 'Ok'
        }).then((result) => {
          AppComponent.isLoggin.next(false);
        })
      }
    })
  }
  resetpassword(credentials:any){ 

    return this.http.post<any>(StandardFunction.apilink + "MstUsers/changerpassword",credentials ) ;

  }
  resetpasswordreq(credentials:any){ 
    
   return  this.http.post<any>(StandardFunction.apilink + "MstUsers/resetpassword",credentials ) ;

  }
  logout() {
    AppComponent.isLoading.next(false);
    AppComponent.isLoggin.next(false);
    this.encrypt.storageclearToken();
    Swal.fire({
      title: 'Success!',
      text: 'Logout Successfully',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      this.router.navigate(["/login"]);
    })

  }

  sessioncheck() {
    let expdata = this.encrypt.storagegetJsonValue("SCVFLoginexp");
    expdata = JSON.parse(expdata)
    let curdate = new Date();
    let curtime = new Date().getTime();
    var exptimechk: number = expdata.exptime - curtime;
    if (expdata.date < curdate) {
      Swal.fire({
        title: 'Warning!',
        text: 'Your session has been expired !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) => {
        this.logout();
      })
      return false;
    }
    else if (exptimechk < 0) {
      Swal.fire({
        title: 'Warning!',
        text: 'Your session has been expired !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) => {
        this.logout();
      })
      return false;
    }
    else return true;
  }
  autologout(expirationdate: number) {
    setTimeout(() => {
      Swal.fire({
        title: 'Warning!',
        text: 'Your session has been expired !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }).then((result) => {
        this.logout();
      })
    }, expirationdate);
  }
}
