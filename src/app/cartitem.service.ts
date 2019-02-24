import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CartitemService {
 private initialitem = new BehaviorSubject("0")
 currentcartitem=this.initialitem.asObservable()

  constructor() { }
  funchangeinitialitem(itmelength:string){
    this.initialitem.next(itmelength)

  }
}
