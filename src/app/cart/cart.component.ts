import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { productsDetails ,CartProductDetails } from '../models/product-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productCount: string[] = ["1", "2", "3", "4", "5"];
  products: productsDetails[]= [];
  cartProducts: CartProductDetails[] = [];
  totalPrice: number = 0;
  constructor(private productService: ProductServiceService, private route: Router) { }

  ngOnInit(): void {
    this.cartProducts = this.productService.getCartProduct();
    this.calculateTotalPrice();
  }
  selectChange(id: number, event: any): void{
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const cartIdx = this.cartProducts.findIndex(cart => cart.id === id);
    cartIdx != -1 && this.cartProducts.length > 0 ? this.cartProducts[cartIdx].option = selectedOption: null;
    this.cartProducts.length > 0 ? this.productService.addToCart(this.cartProducts): null;
    this.calculateTotalPrice()

  }
  removeCart(id: number): void{
    const cartIdx = this.cartProducts? this.cartProducts.findIndex(cart => cart.id === id): -1;
    if(cartIdx != -1 && this.cartProducts.length > 0){
      this.cartProducts.splice(cartIdx,1)
      this.productService.addToCart(this.cartProducts)
      this.calculateTotalPrice()
    }
  }
  calculateTotalPrice(): void{
    this.totalPrice = this.cartProducts.reduce((acc: number, val: any) =>{
      return acc + val.price * Number(val.option);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  checkoutSuccess(firstName: string): void{
    this.productService.clearCart();
    this.route.navigateByUrl(`success/${firstName}/${this.totalPrice}`);
  }

}
