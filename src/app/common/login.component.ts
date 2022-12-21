import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { EncryptService } from '../service/encrypt.service';
import { LoginService } from '../service/login.service';
declare var $  :any ;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private httpclient : HttpClient, private loginserv:LoginService,private deencrypt:EncryptService,private router: Router) {
    if(AppComponent.isLoggin.value==true){
      router.navigate(["/"]);
    }
    AppComponent.isLoggin.subscribe((val:any)=>{ 
      if(val==true)
      this.router.navigate(["/"]);
    });
   }
  @ViewChild('sesaid') sesaid: any;
  @ViewChild('pass') pass: any;
  userid:any="";
  mail:any="";
  ngOnInit(): void {
  
  }
  onLogin (){ 
    const credentials = {
      'sesaid': this.sesaid.nativeElement.value,
      'pass': this.pass.nativeElement.value
    }
    this.loginserv.loginAuth(credentials); 
  }
  resetpassword(){
    const credentials = {
      'userid': this.userid,
      'mail': this.mail
    }
    this.loginserv.resetpasswordreq(credentials).subscribe((data:any)=>{
      Swal.fire({
        title: 'Success!',
        text: 'Please check your mail to change the password !',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        this.userid="";
        this.mail="";
        $("#modal_add" ).modal("hide");
      })
    },error=>{
      Swal.fire({
        title: 'Failed!',
        text: 'Userid or E-Mail not found !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }) 
    }); 
  }
}
