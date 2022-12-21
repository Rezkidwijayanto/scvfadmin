import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count, delay, zip } from 'rxjs';
import Swal from 'sweetalert2'
import { AppComponent } from '../app.component';
import { DataService } from '../service/data.service';
import { EncryptService } from '../service/encrypt.service';
import { StandardFunction } from '../Function/Standard';
import { Training } from '../type/master';
import { paginationFunction } from '../Function/paginationfunction';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
declare var $: any;
declare var JSZipUtils: any;
@Component({
  selector: 'app-training',
  templateUrl: './trainingdoc.component.html'
})
export class TrainingDocComponent implements OnInit {

  newdata: Training[] = [{ id: null, plant: "", cat: "", subjects: "", descs: "", link: "", trainer: "", training_time: "", ex_level: "", idusin: "", idusup: "", ymd8in: new Date(), ymd8up: new Date() }];
  userid: any = "";
  datain: any = [];
  flag: any = false;
  pagerow: any = 10;
  type: any = 'Insert'
  curuserdata: any;
  train_id:any="";
  attchdata: any = [];
  isloading = false;
  subjectmodal: any = "";
  filter: any = "";
  totalpage: any = 0;
  src = "";
  plant: any = "";
  cat: any = "";
  subject: any = "";
  plantlist: any = [];
  pagination = new paginationFunction();
  createRange = paginationFunction.createRange;
  constructor(private data: DataService, private deencrypt: EncryptService, private httpClient: HttpClient, private router: Router) {
    this.pagination.p = 1;
    this.plantlist = AppComponent.deptlist;
    this.plant = AppComponent.data.plant;
    this.pagination.changepagenum.subscribe((data: any) => {
      this.updatedata();
    }
    )
  }

  ngOnInit(): void {

  }
  deldata(id: any) {
    Swal.fire({
      title: 'Are you sure delete this training document ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.sendDelRequest(StandardFunction.apilink + "Training/Delete?id=" + id).subscribe((data: any) => {
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
  updatedata() {
    var param = {
      page: this.pagination.p,
      pagerow: this.pagerow,
      plant: this.plant,
      subject: this.subject,
      cat: this.cat,
      sort: ''
    }
    this.data.sendPostRequest(StandardFunction.apilink + "training/gettrainingdoc", param).subscribe((data: any) => {

      this.datain = Object.assign(JSON.parse(data.data));
      this.flag = true;
      this.totalpage = JSON.parse(data.ttlpage)[0].ttlpage;
    });
  }
  clear() {
    this.newdata = [{ id: null, plant: "", cat: "", subjects: "", descs: "", link: "", trainer: "", training_time: "", ex_level: "", idusin: "", idusup: "", ymd8in: new Date(), ymd8up: new Date() }];
    this.file = ["", ""];
  }
  file: any = ["", ""];
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.file = ["", ""];
    for (var i = 0; i < target.files.length; i++) {
      this.file.push(target.files[i]);
    }
  }
  adddata(type: any, data: any) {
    this.type = type;
    if (type == 'Insert')
      this.clear();
    else
      this.newdata[0] = Object.assign(StandardFunction.setkeyobjecLower(data));
    $("#addplantModal").modal("show");
  }
  insertnewfilest(){
    if (this.file.length > 2  ) { 
      var ex = 0;
      var filename: any = [];
      this.newdata[0].idusin = AppComponent.data.userid;
      this.newdata[0].idusup = AppComponent.data.userid;
      for (var i = 2; i < this.file.length; i++) {
        const formData = new FormData();
        var name: string = ""
        const myArray = this.file[i].name.split(".");
        var types = "." + myArray[myArray.length - 1];
        name = "Training" + "_" + this.subjectmodal.replace("-", "") + "_" + i + 1 +this.attchdata.length + types;
        filename.push(name);
        formData.append("thumbnail", this.file[i], name);
        $("#addplantModal").modal("hide");
        this.data.sendPostRequest(StandardFunction.apilink + "training/InsertImg" + "?id=" + this.train_id+ "&idusin=" + this.newdata[0].idusin, formData).subscribe(
          (data2) => {
            ex++;
          },
          (error) => {
            ex++;
          },
          () => {
            if (ex + 2 == this.file.length) {
              Swal.fire({
                title: 'Success!',
                text:  'Insert Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.updatedata();
                  this.clear();
                }
              })
            }
          }
        )
      }
    }
    else {
      Swal.fire({
        title: 'Warning!',
        text:  ' Please inser the files !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }) 
    }
  }
  DeleteFiles(id:any){
  
    
        this.data.sendDelRequest(StandardFunction.apilink + "training/DeleteFiles" + "?id=" +id).subscribe(
          (data:any)=>{
            Swal.fire({
              title: 'Success!',
              text:  'Insert Successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.updatedata();
                var param = {
                  page: this.pagination.p,
                  pagerow: this.pagerow,
                  train_id: this.train_id,
                  sort: ''
                }
                this.data.sendPostRequest(StandardFunction.apilink + "training/gettrainingfile", param).subscribe((data: any) => {
                  this.attchdata = Object.assign(JSON.parse(data.data));
                  this.flag = true;
                  this.totalpage = JSON.parse(data.ttlpage)[0].ttlpage; 
                });
                this.clear();
              }
              })
            })
          
  }
  executedata(type: any) {
    try {
      var url = 'training/Insert';
      if (type != 'Insert') {
        url = 'Training/Update';
      }
      var filename: any = [];
      this.newdata[0].idusin = AppComponent.data.userid;
      this.newdata[0].idusup = AppComponent.data.userid;
      this.data.sendPostRequest(StandardFunction.apilink + url, this.newdata[0]).subscribe(
        (data: any) => {
          if (this.file.length > 2 && type == 'Insert') {
            var datas = Object.assign(JSON.parse(data.data));
            var ex = 0;
            for (var i = 2; i < this.file.length; i++) {
              const formData = new FormData();
              var name: string = ""
              const myArray = this.file[i].name.split(".");
              var types = "." + myArray[myArray.length - 1];
              name = "Training" + "_" + this.newdata[0].subjects.replace("-", "") + "_" + i + 1 + types;
              filename.push(name);
              formData.append("thumbnail", this.file[i], name);
              $("#addplantModal").modal("hide");
              this.data.sendPostRequest(StandardFunction.apilink + "training/InsertImg" + "?id=" + datas.Value.Id + "&idusin=" + this.newdata[0].idusin, formData).subscribe(
                (data2) => {
                  ex++;
                },
                (error) => {
                  ex++;
                },
                () => {
                  if (ex + 2 == this.file.length) {
                    Swal.fire({
                      title: 'Success!',
                      text: type + ' Successfully',
                      icon: 'success',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.updatedata();
                        this.clear();
                      }
                    })
                  }
                }
              )
            }
          }
          else {
            Swal.fire({
              title: 'Success!',
              text: type + ' Successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.updatedata();
                this.clear();
              }
            })
          }

        },
        (error) => {
          Swal.fire({
            title: 'Insert Failed!',
            text: 'Training already registered!.',
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
  openhelp() {
    $("#HelpModal").modal("show");
  }
  openattch(id: any, subject: any) {
    this.subjectmodal = subject;
    this.train_id = id;
    var param = {
      page: this.pagination.p,
      pagerow: this.pagerow,
      train_id: id,
      sort: ''
    }
    this.data.sendPostRequest(StandardFunction.apilink + "training/gettrainingfile", param).subscribe((data: any) => {
      this.attchdata = Object.assign(JSON.parse(data.data));
      this.flag = true;
      this.totalpage = JSON.parse(data.ttlpage)[0].ttlpage;
      $("#attchModal").modal("show");
    });

  }
  view(filename: any) {
    var type = this.gettype(filename);
    this.type = type;
    if (type.toLowerCase() == "pdf") {
      this.src = "../vfadmin/RPA/Master/training/" + filename;
    }

    $('#ViewModal').modal('show').on('shown.bs.modal', () => {
    });
  }
  gettype(filename: any) {
    var split = filename.split(".");
    var type = split[split.length - 1]
    return type;
  } 
  download(id: any) {
    const files: any = [];
    var param = {
      page: this.pagination.p,
      pagerow: this.pagerow,
      train_id: id,
      sort: ''
    }
    this.data.sendPostRequest(StandardFunction.apilink + "training/gettrainingfile", param).subscribe((data: any) => {
      this.attchdata = Object.assign(JSON.parse(data.data));
      this.attchdata.forEach((element: any) => {
        files.push("../vfadmin/RPA/Master/training/" + element.filename)
      });
      let count = 0;
      const zip = new JSZip()
      files.forEach((element: any) => {
        const filename = element.split("/")[element.split('/').length - 1];
        JSZipUtils.getBinaryContent(element, (err: any, data: any) => {
          if (err) {
            throw err
          }
          zip.file(filename, data, { binary: true })
          count++;

          if (count == files.length) {
            zip.generateAsync({ type: 'blob' }).then((content: any) => {
              const objectUrl: string = URL.createObjectURL(content)
              const link: any = document.createElement('a');
              link.download = 'Sample.zip'
              link.href = objectUrl;
              link.click();
            })
          }

        })
      });
    });
  };
}
