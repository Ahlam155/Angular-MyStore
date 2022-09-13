import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { productsDetails  } from '../models/product-details';
import { CartServiceService } from '../services/cart-service.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { Subscription } from 'rxjs';

@Component({ 
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productCount: string[] = ["1", "2", "3", "4", "5"];
  myCart:productsDetails[]=this.cartService.allCartProduct.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id && t.name === value.name
  )));
  cartProducts:productsDetails[]=this.cartService.allCartProduct;
  totalPriceOfCarts:number=0;
  value:number=0;
  totalPrice:number=this.cartService.totalPrice;
  constructor(private productService: ProductServiceService, private route: Router,private cartService:CartServiceService) 
  { 

  }
  
  ngOnInit(): void {


  }
  
 

 
  removeCart(cardInfo:productsDetails){
    let total=0;

    this.cartProducts.forEach(function(document)
    {
      if(document.id===cardInfo.id){
        total=cardInfo.total*cardInfo.price;
      }
    });
    this.totalPrice-=total


  this.cartService.totalPrice-=total;



    this.myCart=this.myCart.filter(p=>p.id!==cardInfo.id);
    this.cartService.allCartProduct=this.cartService.allCartProduct.filter(p=>p.id!==cardInfo.id);
    
   
    console.log('total price inside remove function',this.totalPrice)

  }  

 
onChange(products:productsDetails, newValue: any) {
  products.total = newValue;

  
  console.log('this.cartService.newOption',this.cartService.newOption)
  this.cartService.newOption=products.total;
  this.totalPrice-=products.totalPrice;
  this.cartService.totalPrice-=products.totalPrice;

products.totalPrice=products.total*products.price;

this.totalPrice+=products.totalPrice;
this.cartService.totalPrice+=products.totalPrice;
this.cartService.newOption=Number(newValue)
}
checkoutSuccess(firstName: string): void{
  this.productService.clearCart();
  this.route.navigateByUrl(`success/${firstName}/${this.totalPrice}`);
}

}

