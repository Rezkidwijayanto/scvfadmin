import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs'; 
import Swal from 'sweetalert2' 
import { AppComponent } from '../app.component'; 
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
import { EncryptService } from '../service/encrypt.service'; 
declare var $: any;
@Component({
  selector: 'app-loginlog',
  templateUrl: './loginlog.component.html' 
})
export class LoginlogComponent implements OnInit {
  datain:any=[];
  flag:any=false; 
  pagerow:any=10; 
  curuserdata:any;
  isloading=false;
  filter:any="";
  totalpage: any = 0;
  plant:any="PEM";
  plantlist:any;
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
  constructor(private data : DataService,private deencrypt: EncryptService,private router: Router ) {
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
    this.pagination.p = 1; 
    this.pagination.changepagenum.subscribe((data: any) => {  
      if(this.plantlist==null)
      this.plantlist= []; 
      this.getuserlog();
    }
    )
 
  }
  getuserlog(){
    var param = {
      page:this.pagination.p ,
      pagerow:this.pagerow,
      plant:this.plant,
      filter:this.filter,
      sort:''
    } 
    this.data.sendPostRequest(StandardFunction.apilink+"MstUsers/GET_mst_users_log",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data)); 
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage; 
    });
  } 
  ngOnInit(): void {
    $('#userModal').on('hidden.bs.modal', (e:any)=> {
      this.getuserlog();
    }); 
  }
     
}
