import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartProductDetails, productsDetails } from '../models/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  myStorage = window.localStorage;

  constructor(private http:HttpClient) { }
  getProductsInfo():Observable<productsDetails[]>{
    return this.http.get<productsDetails[]>('../assets/data.json')

  } 

  addToCart(product: CartProductDetails[]): void{
    this.myStorage.setItem('cart', JSON.stringify(product));
  }
  getCartProduct(): CartProductDetails[] | []{
    const getProduct = this.myStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }
  clearCart(): void{
    this.myStorage.clear();
  }
} 
