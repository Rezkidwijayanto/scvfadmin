import { Injectable, EventEmitter } from '@angular/core';    
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';    
 
export class paginationFunction { 
    public changepagenum: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public p=0; 
    constructor() {
    
    } 
    onClickPage(pageNumber: number|any,ttl:any,): void {
        if (pageNumber != 0 && pageNumber != ttl + 1) {
            this.p = pageNumber;  
            this.changepagenum.next(!this.changepagenum.getValue());
          } 
      }
      public static createRange(number: any) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
          items.push(i);
        }  
        return items;
      } 
   }