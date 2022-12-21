import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
declare var $:any ;
@Component({
  selector: 'app-mstpo',
  templateUrl: './mstpo.component.html' 
})
export class MstpoComponent implements OnInit {
  plant:any="PEM";
  month:any="";
  datain:any=[];
  flag:any=false; 
  pagerow:any=10; 
  plantlist:any=[];
  totalpage: any = 0;
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
   constructor(private fb: FormBuilder,private dataserv:DataService,private datePipe:  DatePipe) {
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
    this.pagination.p=1;
    this.pagination.changepagenum.subscribe((data: any) => {  
      if(this.plantlist==null)
    this.plantlist= [];  
    this.getpolog();
    }
    )
    } 
   file:any=["",""];
   ngOnInit(): void {
   }  
  onFileChange(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file[0]=target.files[0];
   } 
   getpolog(){
    var param = {
      page:this.pagination.p,
      pagerow:this.pagerow,
      plant:this.plant,
      filter:'',
      sort:''
    } 
    this.dataserv.sendPostRequest(StandardFunction.apilink+"api/getpolog",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data)); 
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage;  
    });
  }
  execute(){ 
   var dt = this.datePipe.transform(this.month,"yyyyMM"); 
    var filechk:any=0;
    var url = "api/Insert_PO"
    var filename:any = []; 
    if (this.file[0]) { 
      const formData = new FormData(); 
      var name: string = "" 
      name = this.plant + '_' + "Material"+"_"+this.month+".xlsx"; 
      filename.push(name); 
      console.log( this.file[0])
      formData.append("thumbnail", this.file[0], name);   
      $("#uploadmaterialModal").modal("hide"); 
      this.dataserv.sendPostImg(StandardFunction.apilink + url+"?plant="+this.plant  +"&dtdataseq="+dt+"&idusin=dt", formData).subscribe(() => {
        $("#uploadmaterialModal").modal("show"); 
        Swal.fire({
          title: "Success !",
          text: "Your data has been inserted !",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {  
          $("#uploadmaterialModal").modal("hide"); 
          }) 
      });
    } 
}
}
