import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs'; 
import Swal from 'sweetalert2' 
import { AppComponent } from '../app.component'; 
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
import { EncryptService } from '../service/encrypt.service'; 
import { MstUsers } from '../type/master';
declare var $: any;
@Component({
  selector: 'app-mstusers',
  templateUrl: './mstusers.component.html' 
})
export class MstusersComponent implements OnInit {
  addusers:MstUsers[] = [
    {id:null,userid:"",name:"",plant:"",
    level:"",category:"",mail:"",idusin:"",idusup:"",ymd8in:new Date(),ymd8up:new Date()}]
  datain:any=[];
  flag:any=false;
  userdata:any=[];
  pagerow:any=10; 
  type:any='Insert'
  curuserdata:any;
  isloading=false;
  filter:any="";
  totalpage: any = 0;
  plant:any="PEM";
  plantlist:any=[]; 
  position: any = [];
  level: any = [];
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
  constructor(private data : DataService,private deencrypt: EncryptService,private router: Router) {
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
   this.pagination.p=1;
    this.pagination.changepagenum.subscribe((data: any) => {  
      if(this.plantlist==null)
      this.plantlist= [];
      this.updatedata();
      this.getparam();
    }
    )
  }
  adddata(type:any,data:any){
    this.type=type; 
    if(type=='Insert')
    this.clear();
    else 
    this.addusers[0]= Object.assign(StandardFunction.setkeyobjecLower(data)); 
    $("#addusersModal").modal("show");
  }
  getparam(){      
    this.data.sendPostRequest(StandardFunction.apilink + 'MstUsers/GetUserDeptAcc',{userid:'dt',password:''  }).subscribe((data: any) => {
      this.plantlist = Object.assign(JSON.parse(data.data));
      this.addusers[0].plant = JSON.parse(data.data)[0].plant; 
    });
    this.data.sendPostRequest(StandardFunction.apilink + 'MstCategories',{Category: "Position"  }).subscribe((data: any) => {
      this.position = Object.assign(JSON.parse(data.data));
      this.addusers[0].level = JSON.parse(data.data)[0].Title;
    });
    this.data.sendPostRequest(StandardFunction.apilink + 'MstCategories',{Category: "Users Access Level"}).subscribe((data: any) => {
      this.level= Object.assign(JSON.parse(data.data));
      this.addusers[0].category= JSON.parse(data.data)[0].Title;
    });
  }
   
  ngOnInit(): void {
    $('#userModal').on('hidden.bs.modal', (e:any)=> {
    this.updatedata();
    }); 
  }
  deldata(id:any){ 
    Swal.fire({
      title: 'Are you sure delete this users?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) { 
        this.data.sendDelRequest(StandardFunction.apilink+"MstUsers/DeleteMstUsers?userid="+id).subscribe((data:any)=>{
          Swal.fire({
            title: 'Success!',
            text: 'Delete Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
            
          }).then((result) => {
           this.updatedata();
          })
        });
      }
    }) 
  }
  updatedata(){
    var param = {
      page:this.pagination.p,
      pagerow:this.pagerow,
      plant:this.plant,
      filter:this.filter,
      sort:''
    } 
    this.datain=[]; 
    this.data.sendPostRequest(StandardFunction.apilink+"MstUsers/GetMstUsers",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data));  
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage;   
    });
  } 
  
  executedata(type: any) {
    try {
      var url = 'MstUsers/InserttMstUsers'; 
      if (type != 'Insert'){
        url = 'MstUsers/GetMstUsersUpdate';
      } 
      $("#addusersModal").modal("hide"); 
    this.data.sendPostRequest(StandardFunction.apilink + url, this.addusers[0]).subscribe(
          (data) => { 
            Swal.fire({
              title: 'Success!',
              text: type+' Successfully',
              icon: 'success',
              confirmButtonText: 'Ok' 
            }).then((result) => { 
              if (result.isConfirmed) {
                this.updatedata(); 
                this.clear();
              }
            })
          },
          (error) => {
            Swal.fire({
              title: type+' Failed!',
              text: 'userid has been registered.',
              icon: 'error',
              confirmButtonText: 'Ok' 
            }).then((result) => { 
              if (result.isConfirmed) {
                $("#addusersModal").modal("show"); 
              }
            })
          }
        );  
    }
    catch (exeception) { 
    }

  }
  clear(){
    this.addusers = [
      {id:null,userid:"",name:"",plant:"",
      level:"",category:"",mail:"",idusin:"",idusup:"",ymd8in:new Date(),ymd8up:new Date()}]
  }
  openhelp(){
    $("#HelpModal").modal("show"); 
  }
}
