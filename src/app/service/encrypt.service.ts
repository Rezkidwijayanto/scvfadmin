import { Injectable } from '@angular/core';
const SecureStorage = require('secure-web-storage');
const CryptoJS = require('crypto-js');
const SECRET_KEY = 'dt@1234567890123';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
    constructor() { }// Set the json data to local 
    storagesetJsonValue(key: string, value: any) {
        this.secureStorage.setItem(key, value);
    }// Get the json value from local 
    storagegetJsonValue(key: string) {
        if(this.secureStorage.getItem(key)!=null)
        return this.secureStorage.getItem(key);
        else 
        return ""
    }// Clear the local 
    storageclearToken() { return this.secureStorage.clear(); }
      
    public secureStorage = new SecureStorage(sessionStorage, {
      hash : function hash(key:string):
           any {
           key = CryptoJS.SHA256(key, SECRET_KEY);
           return key.toString();
       },
       // Encrypt the localstorage dataencrypt: 
       encrypt : function encrypt(data:any) {
       data = CryptoJS.AES.encrypt(data, SECRET_KEY); data = data.toString(); return data;
   },
   decrypt : function decrypt(data:any) {
           data = CryptoJS.AES.decrypt(data, SECRET_KEY);
           data = data.toString(CryptoJS.enc.Utf8); 
           return data;
       }});

    public static encryptdata( datain:any){ 
        var key = CryptoJS.enc.Utf8.parse('dt@1234567890123');
        var iv =  CryptoJS.enc.Utf8.parse('dt@1234567890123');
      
        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(datain), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        
        return encryptedlogin.toString();
    }
    public static Dencryptdata( datain:any){
      
        var key = CryptoJS.enc.Utf8.parse('dt@1234567890123');
        var iv =  CryptoJS.enc.Utf8.parse('dt@1234567890123');
        var encryptedlogin = CryptoJS.AES.decrypt(datain, key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return encryptedlogin.toString(CryptoJS.enc.Utf8);
    }
}
