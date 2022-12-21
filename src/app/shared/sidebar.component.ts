import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { EncryptService } from '../service/encrypt.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  data:any = [];
  constructor(private deencrypt: EncryptService) { 
    AppComponent.isLoggin.subscribe((value:any)=>{
      if(value==true)
      {
        if(AppComponent.deptlist==undefined){
          let data = this.deencrypt.storagegetJsonValue("SCVFLogin");
          if (data != "")
          this.data = JSON.parse(data);
          data = this.data;
          AppComponent.data = JSON.parse(JSON.stringify(data));
          AppComponent.deptlist = Object.assign(data.deptlist); 
        } 
      }   
    })
  }
  sbstats: any = false;
  ngOnInit(): void {
    $('#earth').click((e: any) => {
      this.sbstats = !this.sbstats;
      if (this.sbstats == true) {
        $('#sidebar1').css("width", "18rem")
        setTimeout(function () {
          $(".sidebar-text").fadeIn(250);
        }, 200);
      }
      else {
        $('#sidebar1').css("width", "4rem")
        $(".sidebar-text").fadeOut(250);
      }
    });
    $('#sidebar1').hover((e: any) => {
      if (this.sbstats == false) {
        $('#sidebar1').css("width", "18rem")
        setTimeout(function () {
          $(".sidebar-text").fadeIn(250);
        }, 10);
      }

    }, () => {
      if (this.sbstats == false) {
        $('#sidebar1').css("width", "4rem")
        $(".sidebar-text").fadeOut(250);
      }
    }); 
  }

}
