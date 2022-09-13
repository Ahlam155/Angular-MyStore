import { ProductServiceService } from '../services/product-service.service';
import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { productsDetails } from '../models/product-details';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from '../services/cart-service.service';




@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
product:productsDetails[]=[];
cartProducts:productsDetails[]=this.cartService.allCartProduct;

@Output() addNewProduct:EventEmitter<productsDetails>=new EventEmitter;
idValue:number=0;
text:string[]=['You can read it!','Listen to stuff','Carry things around town',
                'Now you can see better','Drink anything with it','Wear it with style'];

totalPrice!: number;
subscription: Subscription = new Subscription;
totalPriceOfCarts:number=0;

  constructor( private cartService:CartServiceService,private productService:ProductServiceService,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {



    this.subscription = this.productService.currentValue.subscribe(totalPrice => this.totalPrice = totalPrice)
    

    this.productService.getProductsInfo().subscribe(data=>{
      this.product=data;
    })
    this.route.paramMap.subscribe(param =>
      {


    const data= param.get('id');
    console.log(data);
    if (data ==':1'){
      this.idValue=1;
  }
    if (data ==':2'){
      this.idValue=2;
    }
    if (data ==':3'){
      this.idValue=3;
    }
    if (data ==':4'){
      this.idValue=4;
    }
    if (data ==':5'){
      this.idValue=5;
    }
    if (data ==':6'){
      this.idValue=6;
    }

    }
    
    );
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
   

  }
  onSubmit(cartProduct: productsDetails, event: any):any{
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

}
   alert(`New product(s) of ${cartProduct.name} is(are) added to cart`)


        this.totalPrice=this.cartService.option*cartProduct.price;
        cartProduct.totalPrice=this.totalPrice;
        console.log(' totalPrice', this.totalPrice)

        this.cartService.totalPrice+=count;
        console.log(' this.cartService.totalPrice', this.cartService.totalPrice)



    this.productService.changeValue(this.totalPriceOfCarts)

   
 
  
  }
onChange(products:productsDetails, newValue: any) {
  products.option = newValue;  
  
}

 getProduct(product:productsDetails){
  this.cartService.addProductToCart(product)  

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

