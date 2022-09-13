import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  productsDetails } from '../models/product-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class ProductServiceService {
  myStorage = window.localStorage;

  private totalValue = new BehaviorSubject(0);
  currentValue = this.totalValue.asObservable(); 

  constructor(private http:HttpClient) { }

  changeValue(totalPrice: number) {
    this.totalValue.next(totalPrice)
  }

  getProductsInfo():Observable<productsDetails[]>{
    return this.http.get<productsDetails[]>('../assets/data.json')

  } 


  clearCart(): void{
    this.myStorage.clear();
  }
} 
