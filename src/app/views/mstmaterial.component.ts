import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { paginationFunction } from '../Function/paginationfunction';
import { StandardFunction } from '../Function/Standard';
import { DataService } from '../service/data.service';
declare var $:any ;
@Component({
  selector: 'app-mstmaterial',
  templateUrl: './mstmaterial.component.html'  
})
export class MstmaterialComponent implements OnInit {
  plant:any="";
  month:any="";
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
   constructor(private fb: FormBuilder,private dataserv:DataService) {
  
    } 
   file:any=["",""];
   ngOnInit(): void {
   }  
  onFileChange(evt:any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file[0]=target.files[0];
   } 
  execute(){
    console.log('test')
    var filechk:any=0;
    var url = "api/mst_material"
    var filename:any = []; 
    if (this.file[0]) { 
      const formData = new FormData(); 
      var name: string = "" 
      name = this.plant + '_' + "Material"+"_"+this.month.replace("-","")+".xlsx"; 
      filename.push(name); 
      console.log( this.file[0])
      formData.append("thumbnail", this.file[0], name);   
      $("#uploadmaterialModal").modal("hide"); 
      this.dataserv.sendPostImg(StandardFunction.apilink + url+"?plant="+this.plant  +"&idusin=dt", formData).subscribe(() => {
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
