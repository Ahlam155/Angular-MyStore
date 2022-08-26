import { ProductServiceService } from '../services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { productsDetails } from '../models/product-details';
import { ActivatedRoute } from '@angular/router';
import { CartProductDetails } from '../models/product-details'; 


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
product:productsDetails[]=[];
id:number=0;
text:string[]=['You can read it!','Listen to stuff','Carry things around town',
                'Now you can see better','Drink anything with it','Wear it with style'];
  constructor(private productService:ProductServiceService,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.productService.getProductsInfo().subscribe(data=>{
      this.product=data;
    })
    this.route.paramMap.subscribe(param =>
      {

     
     const data= param.get('id');
     console.log(data);
     if (data ==':1'){
      this.id=1;
     }
     if (data ==':2'){
      this.id=2;
     }
     if (data ==':3'){
      this.id=3;
     }
     if (data ==':4'){
      this.id=4;
     }
     if (data ==':5'){
      this.id=5;
     }
     if (data ==':6'){
      this.id=6;
     }

    }
     
     );
     
  }
  onSubmit(cartProduct: productsDetails, event: any): boolean
{
  let newCartProduct: CartProductDetails[] = [];
  let message: string = '';
  let isCartOptionExist: boolean = false;

  const selectedOption = event.target[0].options[event.target[0].options.selectedIndex].value;
  const cartProducts: CartProductDetails[] | [] = this.productService.getCartProduct();

    const cartIdx = cartProducts.findIndex(cart => cart.id === cartProduct.id)
    newCartProduct = cartProducts;

    if((cartIdx === -1) || (cartProducts.length === 0)){
      newCartProduct.push(Object.assign(cartProduct, {option: selectedOption}))
      message = `New Item '${cartProduct.name}' added to cart`;
    } else{
      const option: string = newCartProduct[cartIdx].option;
      isCartOptionExist = selectedOption === option

      if (isCartOptionExist){
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart.`;
      }else{
        newCartProduct[cartIdx].id = cartProduct.id;
        newCartProduct[cartIdx].option = selectedOption;
        message = `${option} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedOption}`;
      }
      
    }
    !isCartOptionExist? this.productService.addToCart(newCartProduct): null;

    alert(message);

    this.printLocalData(); // for debugging
    return false;
  }
  printLocalData(): void{
    console.log(this.productService.getCartProduct())
}
   
 
}
