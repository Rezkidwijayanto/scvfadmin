 
import { HttpHeaders } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { EncryptService } from "../service/encrypt.service"; 
import Swal from "sweetalert2";
import { rejects } from "assert";
import * as XLSX from "xlsx";
export class StandardFunction {
    constructor(private deencrypt: EncryptService) {

    }
 
    public static apilink = "https://eajdigitization.se.com/BEvendorforecast/api/";
    //public static apilink = "https://localhost:7015/api/";
     
     
    public static setkeyobjecUpper(item: any) {
        const x: any = {};
        for (const [key, value] of Object.entries(item)) {
            x[key.toUpperCase()] = value;
        }
        return x;
    }
    public static setkeyobjecLower(item: any) {
        const x: any = {};
        for (const [key, value] of Object.entries(item)) {
            x[key.toLowerCase()] = value;
        }
        return x;
    }
    public static setkeyArrayobjecUpper(item: any) {

        var items: any = item;
        for (var i = 0; i < items.length; i++) {
            const x: any = {};
            for (const [key, value] of Object.entries(items[i])) {
                x[key.toUpperCase()] = value;
            }
            items[i] = x;
        }

        return items;
    }
    public static setkeyArrayobjecLower(item: any) {

        var items: any = item;
        for (var i = 0; i < items.length; i++) {
            const x: any = {};
            for (const [key, value] of Object.entries(items[i])) {
                x[key.toLowerCase()] = value;
            }
            items[i] = x;
        }

        return items;
    }
 
    public getheader(): any {
        let data = this.deencrypt.storagegetJsonValue("CyclecountLogin");
        if (data != "") {
            data = JSON.parse(data);
            var token = data.value;
            const headers = new HttpHeaders().set('Authorization', "Bearer " + token)
            //  .set('Content-Type', 'application/json')
            return headers;
        }

        else
            return null;
    }

      
    public static numFormatter(num: any) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
        }
    } 

    public static get24month(month:any){
        if(month=="")
        month=new Date();
       
        var yearmonth= [];
        for(var i =0;i<24 ; i++){
            var date = new Date( month);
            var newDate = new Date(date.setMonth(date.getMonth()+i)); 
            yearmonth.push(newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2));
          }
          return yearmonth;
    }
    public static getcylclemonth(month:any,ttl:any){
        if(month=="")
        month=new Date(); 
        var yearmonth= [];
        for(var i =0;i<ttl ; i++){
            var date = new Date( month);
            var newDate = new Date(date.setMonth(date.getMonth()+i)); 
            yearmonth.push(newDate.getFullYear() + ("0" + (newDate.getMonth() + 1)).slice(-2));
          }
          return yearmonth;
    }
    public static monthDiff(d1:any, d2:any) {
        
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
    public static ExportTOExcel(json:any,headers:any,filename:any) { 
        const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(json,{skipHeader:true});
        
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //  XLSX.utils.sheet_add_aoa(ws, headers); 
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
        /* save to file */
        XLSX.writeFile(wb, filename);
      }
}
