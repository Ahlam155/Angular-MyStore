import { Component, OnInit , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();

  constructor() { }
  firstName: string='';
  address: string='';
  creditCard: number | string = '';

  ngOnInit(): void {
  }
  onSubmit():void{
    this.checkoutSuccess.emit(this.firstName);
  }

}
