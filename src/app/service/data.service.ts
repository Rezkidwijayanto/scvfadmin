import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { of, throwError } from 'rxjs';
import { mergeMap, delay, retryWhen } from 'rxjs/operators';
export const maxRetries = 2;
export const delayMs = 2000;
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { StandardFunction } from '../Function/Standard'; 
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private deencrypt: EncryptService, private router: Router) { }
  public sendGetRequest(navlink: string) {
    return this.httpClient.get(navlink);
  }
  public sendGetRequestAnon(navlink: string) {
    return this.httpClient.get(navlink);
  }
  public sendPostRequest(navlink: string, body: any) {
    return this.httpClient.post(navlink, body);
  }
  public sendPostImg(navlink: string, body: any) {
    return this.httpClient.post(navlink, body);
  }
  public sendPutRequest(navlink: string, body: any) {

    return this.httpClient.put(navlink, body);
  }
  public sendDelRequest(navlink: string) {
    var dataheader = new StandardFunction(this.deencrypt);
    var header = dataheader.getheader();
    var headers = new HttpHeaders();
    headers = header;
    return this.httpClient.delete(navlink, { headers });
  }
  intercept(req: HttpRequest<any> | any, next: HttpHandler): Observable<HttpEvent<any>> {
    AppComponent.isLoading.next(true);
    var dataheader = new StandardFunction(this.deencrypt);     
    var header = dataheader.getheader();  
    if(header!=null){
      var headers = new HttpHeaders(); 
      headers = header; 
      if(req.url.includes('InsertLx17req')){ 
        req.headers = header;
      req.reportProgress =true;
      req.observe = 'events';
      }
      else {
        header.set('Content-Type', 'application/json') ;
        req.headers = header; 
      }
    }  
  
    if(req.method=="POST" && !req.url.toLowerCase().includes('pdf') && !req.url.includes('mst_gap1') && !req.url.includes('InsertImg') && !req.url.includes('demand?plant') && !req.url.includes('Insert_PO') && !req.url.includes('mst_gap2') && !req.url.includes('vf_cycle')  && !req.url.includes('mst_material') ){  
   
      var payload = { payloads: EncryptService.encryptdata(JSON.stringify(req.body)) }; 
    req.body = payload; 
    }
    return next.handle(req).pipe( 
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            
            var title = "Failed to connected to database!";
            var text = 'Please check to system administrator.';  
            
              try {
                if(req.method=="POST" && !req.url.includes('img') && !req.url.includes('InsertLx17req')){
              var response = EncryptService.Dencryptdata(error.error.response);
              var data = JSON.parse(response);
               title = "Error!";
               text = data.error;
                }
            }
            catch (e:any){ 
            
            }  
            Swal.fire({
              title: title,
              text: text,
              icon: 'warning',
              confirmButtonText: 'Ok'
            });
            if(req.method=="POST"){
            AppComponent.isLoading.next(false);
            }
            throw error;
          }))
      }),
      map((resp: any) => {
        if (resp instanceof HttpResponse) {
          if(resp.body!=null){
          var response = EncryptService.Dencryptdata(resp.body.response);
          var data = JSON.parse(response);
          AppComponent.isLoading.next(false);
          return resp.clone({
            body: data
          });
          }
        }
        return resp;
      }),
    )
  };
}
