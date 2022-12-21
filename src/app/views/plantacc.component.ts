import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs'; 
import Swal from 'sweetalert2' 
import { AppComponent } from '../app.component'; 
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
import { EncryptService } from '../service/encrypt.service'; 
import { PlantAcc } from '../type/master';
declare var $: any;
@Component({
  selector: 'app-plantacc',
  templateUrl: './plantacc.component.html' 
})
export class PlantaccComponent implements OnInit {
  datain:any=[];
  flag:any=false; 
  pagerow:any=10; 
  type:any='Insert'
  curuserdata:any;
  isloading=false;
  filter:any="";
  totalpage: any = 0;
  plant:any="SENSOR";
  plantacc:PlantAcc|any = [{userid:"",plant:"",idusin:"",idusup:"",ymd8in:"",ymd8up:""}];
  plantlist:any=[];
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
  constructor(private data : DataService,private deencrypt: EncryptService,private router: Router ) {
   
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
   
    this.pagination.p=1;
    this.pagination.changepagenum.subscribe((data: any) => {  
      if(this.plantlist==null)
      this.plantlist= []; 
      this.updatedata();
    }
    )
  }
 
  ngOnInit(): void {
    $('#userModal').on('hidden.bs.modal', (e:any)=> {
    this.updatedata();
    }); 
  }
  deldata(id:any,plant:any){
    Swal.fire({
      title: 'Are you sure delete this users access?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) { 
        this.data.sendDelRequest(StandardFunction.apilink+'MstDeptAccess?userid='+id+'&plant='+plant).subscribe((data:any)=>{
          Swal.fire({
            title: 'Success!',
            text: 'Delete Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
            
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
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
      filter:this.filter,
      sort:''
    }
    this.data.sendPostRequest(StandardFunction.apilink+"MstUsers/GET_Dept_Lists",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data)); 
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage; 
    });
  } 
 
 executedata() {
  try {
    var url = 'MstDeptAccess';   
    $("#addplantModal").modal("hide");
    this.data.sendPostRequest(StandardFunction.apilink + url, this.plantacc[0]).subscribe(
        (data) => { 
          Swal.fire({
            title: 'Success!',
            text:'Insert Successfully',
            icon: 'success',
            confirmButtonText: 'Ok' 
          }).then((result) => { 
            if (result.isConfirmed) {
              this.updatedata();  
            }
          })
        },
        (error) => {
          Swal.fire({
            title: 'Insert Failed!',
            text: 'Plant already registered!.',
            icon: 'error',
            confirmButtonText: 'Ok' 
          }).then((result) => { 
            if (result.isConfirmed) { 
              $("#addplantModal").modal("show");
            }
          })
        }
      );  
  }
  catch (exeception) { 
  } 
}
}