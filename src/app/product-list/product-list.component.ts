import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { productsDetails ,CartProductDetails} from '../models/product-details';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  myProductDetails:productsDetails[]=[];
  productCount: string[] = ["1", "2", "3", "4", "5"];
  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
  
  this.productService.getProductsInfo().subscribe(data =>{
    this.myProductDetails=data;
  })  
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
