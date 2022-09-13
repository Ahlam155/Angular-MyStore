import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import {  productsDetails} from '../models/product-details';
import { CartServiceService } from '../services/cart-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  myProductDetails:productsDetails[]=[];
  cartProducts:productsDetails[]=this.cartService.allCartProduct;

 
 totalPrice:number=0;
 subscription: Subscription = new Subscription;
 click:number=0;

    constructor(private productService:ProductServiceService,private cartService:CartServiceService) {
  
  
    }

  ngOnInit(): void {

  

    this.subscription = this.productService.currentValue.subscribe(totalPrice => this.totalPrice = totalPrice)

  this.productService.getProductsInfo().subscribe(data =>{
    this.myProductDetails=data;
  })  


  
}  
ngOnDestroy() {
  this.subscription.unsubscribe();
}
onSubmit(cartProduct: productsDetails, event: any):any
{

  let count=Number(cartProduct.option )*cartProduct.price;

  let option=Number(cartProduct.option);
  if(this.isExist(cartProduct)){
    this.cartService.option+=option;
    cartProduct.total=this.cartService.option;
    console.log('cartProduct.total',this.cartService.option)
    console.log(' cartProduct.total', cartProduct.total)
    this.cartService.addProductToCart(cartProduct);
  
  }
else{
  this.cartService.addProductToCart(cartProduct);
  console.log('new product is added')
  this.cartService.option=Number(cartProduct.option);
  cartProduct.total=this.cartService.option;
  cartProduct.clicks=cartProduct.total
}
alert(`New product(s) of ${cartProduct.name} is(are) added to cart`)


        this.totalPrice=this.cartService.option*cartProduct.price;
        cartProduct.totalPrice=this.totalPrice;

        console.log(' totalPrice', this.totalPrice)

        this.cartService.totalPrice+=count;
        console.log(' this.cartService.totalPrice', this.cartService.totalPrice)


} 

onChange(products:productsDetails, newValue: any) {
  products.option = newValue;
  
  console.log(' products.option ', products.option )
  console.log(products.option);
  
}
isExist(cart:productsDetails):boolean{
  let exsit=false
  this.cartProducts.forEach(function(document)
    { 
      if(document.id===cart.id){
        exsit=true
      }
    });
    return exsit;
}


}
