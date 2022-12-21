import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './service/data.service';
import { EncryptService } from './service/encrypt.service';
import { LoginService } from './service/login.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public static isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static isLoggin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static data: any = []; 
  public static deptlist :any;
  isloadings:any = false;
  login: any = false;
  data: any = [{ name: "", level: "", category: "", islogin: "false" }];
  constructor(private router: Router,private loginserv : LoginService,private deencrypt: EncryptService,private dataserv: DataService) {
    this.loginchk();
    router.events.subscribe((url:any) => 
    {
    if (this.login == true ) {
      let data = this.deencrypt.storagegetJsonValue("SCVFLogin"); 
      if (data != "")
      this.data = JSON.parse(data);
      data = this.data; 
      AppComponent.data = JSON.parse(JSON.stringify(data));
      AppComponent.deptlist = Object.assign(data.deptlist);
    }
    else { 
      AppComponent.data = JSON.parse(JSON.stringify([]));
       if(url.url!=undefined && url.url!='/login' && url.url!='/reset')
       this.router.navigate(["/login"]);
    }
   });
    AppComponent.isLoggin.subscribe(value => {
      this.login = value;  
    })
    AppComponent.isLoading.subscribe(value => {
      this.isloadings=value; 
      if (value == false) {
        document.body.style.overflow = 'auto';
      }
      else {
        document.body.style.overflow = 'hidden';
      }
    })
    } 
    ngOnInit(): void {
     
    }
  title = 'scvfadmin';
  opts:any= false;
  showopts(){
   this.opts= !this.opts;
  }
  loginchk() {
    let data = this.deencrypt.storagegetJsonValue("SCVFLogin");
    if (data != "")
      this.data = JSON.parse(data);
    data = this.data;
    if (data.islogin == "true") { 
      AppComponent.isLoggin.next(true);
    }
    else if (data.islogin == "false") {
      AppComponent.isLoggin.next(false);
    }
    else if (data == "") {
      AppComponent.isLoggin.next(false);
    } 
  }
  logout() {
    this.loginserv.logout();
  }
}
