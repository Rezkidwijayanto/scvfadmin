import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
declare var $:any;
@Component({
  selector: 'app-mstgap',
  templateUrl: './mstgap.component.html' 
})
export class MstgapComponent implements OnInit { 
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
    this.getgaplog();
    }
    )
   } 
  file:any=["",""];
  ngOnInit(): void {
  }
  getgaplog(){
    var param = {
      page:this.pagination.p,
      pagerow:this.pagerow,
      plant:this.plant,
      filter:'',
      sort:''
    } 
    this.dataserv.sendPostRequest(StandardFunction.apilink+"api/getgaplog",param).subscribe((data:any)=>{
      this.datain = Object.assign(JSON.parse(data.data)); 
      this.flag=true;
      this.totalpage=JSON.parse(data.ttlpage)[0].ttlpage; 
      console.log(this.datain);
    });
  }
  onFileChange1(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file[0]=target.files[0];
   }
   onFileChange2(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file[1]=target.files[0];
   }
   
  execute(){
    var filechk:any=0;
    var url = "api/mst_gap"
    var filename:any = [];
    for (var i = 0; i < this.file.length; i++) {
    if (this.file[i]) { 
      const formData = new FormData(); 
      var name: string = ""
      if(i==0)
      {
      url = "api/mst_gap1";
      name = this.plant + '_' + "Kinaxis"+"_"+this.month.replace("-","")+".xlsx";
      } 
      else {
        url = "api/mst_gap2";
      name = this.plant + '_' + "zmd04e"+"_"+this.month.replace("-","")+".xlsx"; 
      }
      filename.push(name); 
      formData.append("thumbnail", this.file[i], name);   
      $("#uploadgapcycleModal").modal("hide"); 
      var flg =true;
      this.dataserv.sendPostImg(StandardFunction.apilink + url, formData).subscribe(() => {
          filechk ++;
          if(filechk++&&flg){
            flg=false;
            this.dataserv.sendGetRequest(StandardFunction.apilink + "Api/mst_gap3?plant="+this.plant+"&dtdataseq="+this.month.replace("-","")+"&filenm="+filename[0]+"&filenm2="+filename[1]+"&idusin=dt").subscribe(
              () => {  
                $("#uploadgapcycleModal").modal("show"); 
                   Swal.fire({
            title: "Success !",
            text: "Your data has been inserted !",
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {  
            $("#uploadgapcycleModal").modal("hide"); 
            })
              });
          }
      });
    }
  }
  }
  openhelp(){
    $("#HelpModal").modal("show"); 
  }

}
