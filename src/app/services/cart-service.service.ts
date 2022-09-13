import { identifierName } from "@angular/compiler";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { productsDetails } from "../models/product-details";

@Injectable({
  providedIn: 'root'
})

export class CartServiceService 
{  
  allCartProduct:productsDetails[]=[];
 newOption=0;
  option=0;
  totalPrice:number=0;



  

  removeCart(item:any)
  {
    const indexOfObject = this.allCartProduct.findIndex((object) => {
      return object.id === item;
    });
    if (indexOfObject !== -1) {
      this.allCartProduct.splice(indexOfObject, 1);
    }
}
  addProductToCart(myProduct:productsDetails)
  {
    this.allCartProduct.unshift(myProduct);
    

  }
   

  
  
}
