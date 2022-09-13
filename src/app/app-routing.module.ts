import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {path:'cart' ,component:CartComponent},
  {path: 'product-detail/:id' ,component:ProductItemDetailComponent},
  {path:'' ,component:ProductListComponent},
  {path: 'success/:firstName/:totalPrice', component: CheckoutSuccessComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[CartComponent,
 ProductItemDetailComponent,ProductListComponent]