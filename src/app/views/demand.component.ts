import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
declare var $ :any ;
@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html' 
})
export class DemandComponent implements OnInit {
  plant:any="PEM";
  month:any="";
  datain:any=[];
  flag:any=false; 
  pagerow:any=10; 
  plantlist:any=[];
  totalpage: any = 0;
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
   constructor(private fb: FormBuilder,private dataserv:DataService) {
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
    this.pagination.p=1
    this.pagination.changepagenum.subscribe((data: any) => {  
      if(this.plantlist==null)
      this.plantlist= []; 
      this.getvflog();
    }
    )
 
    } 
    getvflog(){ 
      var param = {
        page:this.pagination.p,
        pagerow:this.pagerow,
        plant:this.plant,
        filter:'',
        sort:''
      } 
      this.dataserv.sendPostRequest(StandardFunction.apilink+"api/demandlog",param).subscribe((data:any)=>{
        this.datain = Object.assign(JSON.parse(data.data)); 
        this.flag=true;
        this.totalpage=JSON.parse(data.ttlpage);  
      });
    }
   file:any=["",""];
   ngOnInit(): void {
   }  
  onFileChange(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file[0]=target.files[0];
   } 
  
  execute(){
    var filechk:any=0;
    var  url = "api/demand";
    var filename:any = [];
    if (this.file[0]) { 
      const formData = new FormData(); 
      var name: string = "" 
      name = this.plant + '_' + "demand"+"-"+this.month.replace("-","")+".xlsx"; 
      filename.push(name);  
      formData.append("thumbnail", this.file[0], name);   
      $("#uploadvfcycleModal").modal("hide"); 
      this.dataserv.sendPostImg(StandardFunction.apilink + url+ "?plant="+this.plant+"&dtdataseq="+this.month.replace("-","") +"&idusin=dt", formData).subscribe(() => {
        $("#uploadvfcycleModal").modal("show"); 
        Swal.fire({
          title: "Success !",
          text: "Your data has been inserted !",
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {  
          $("#uploadvfcycleModal").modal("hide"); 
          }) 
      });
    }
   
}
openhelp(){
  $("#HelpModal").modal("show"); 
}
}
