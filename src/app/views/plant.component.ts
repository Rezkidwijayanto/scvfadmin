import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs'; 
import Swal from 'sweetalert2'
import { AppComponent } from '../app.component'; 
import { DataService } from '../service/data.service';
import { EncryptService } from '../service/encrypt.service'; 
import { StandardFunction } from '../Function/Standard';
import { Plant } from '../type/master';
import { paginationFunction } from '../Function/paginationfunction';
declare var $: any;
@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html' 
})
export class PlantComponent implements OnInit {

  plant : Plant[]=[{id:null,plant:"",kinaxis_plant:"",desc:"",typecnt:0,werks:"",idusin:"",idusup:"",ymd8in:new Date(),ymd8up:new Date()}];
  userid:any="";
  datain:any=[];
  flag:any=false;
  pagerow:any=10; 
  type: any ='Insert'
  curuserdata:any;
  isloading=false;
  filter:any="";
  totalpage: any = 0;  
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
  constructor(private data : DataService,private deencrypt: EncryptService,private router: Router) {
    this.pagination.p=1;
    this.pagination.changepagenum.subscribe((data: any) => {  
      this.updatedata(); 
    }
    )
  }
   
  ngOnInit(): void { 

  }
  deldata(id:any){ 
    Swal.fire({
      title: 'Are you sure delete this plant',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) { 
        this.data.sendDelRequest(StandardFunction.apilink+"MstPlant/DeletePlantData?id="+id).subscribe((data:any)=>{
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
      filter:this.filter,
      sort:''
    }
    this.data.sendPostRequest(StandardFunction.apilink+"MstUsers/GET_Plant_Lists",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data));
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage; 
    });
  }  
  clear(){
  this.plant=  [{id:null,plant:"",kinaxis_plant:"",desc:"",typecnt:0,werks:"",idusin:this.userid,idusup:this.userid,ymd8in:new Date(),ymd8up:new Date()}];
  } 
  adddata(type:any,data:any){
    this.type=type; 
    if(type=='Insert')
    this.clear();
    else 
    this.plant[0]= Object.assign(StandardFunction.setkeyobjecLower(data)); 
    $("#addplantModal").modal("show");
  }
    executedata(type: any) {
    try {
      var url = 'MstPlant/InsertPlantData'; 
      if (type != 'Insert'){
        url = 'MstPlant/UpdatePlantData';
      }  
      $("#addplantModal").modal("hide");
    this.data.sendPostRequest(StandardFunction.apilink + url, this.plant[0]).subscribe(
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
  openhelp(){
    $("#HelpModal").modal("show"); 
  }
}
