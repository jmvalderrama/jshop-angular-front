import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { IProduct } from '../../models/product';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { IHttpResponse } from '../../models/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  products: IProduct[];
  total: number = 0;
  orderForm: FormGroup;
  saved: boolean = false;
  message: string = '';

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.orderForm = this.formBuilder.group({
      client_name: ['', Validators.required],
      client_email: ['', Validators.required],
      client_address: ['', Validators.required],
      client_contact: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadProducts();
    if (this.products) this.getTotal();
  }

  private loadProducts(): void {
    this.products = JSON.parse(localStorage.getItem('cart'));
  }

  private getTotal(): void {
    this.total = this.products.map(product => product.price).reduce((sum, total) => sum + total);
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
    this.orderService.changeTotal(this.products.length);
    localStorage.setItem('cart', JSON.stringify(this.products));
    if (this.products.length == 0) {
      this.total = 0;
      localStorage.removeItem('cart');
    } else {
      this.getTotal();
    }
  }

  saveOrder(): void {
    this.spinner.show();
    setTimeout(() => {
      let order = {
        ...this.orderForm.value,
        total: this.total,
        ref_Product: this.products.map(product => product._id)
      };
      this.orderService.save(order).subscribe(
        (response: IHttpResponse) => {
          this.message = response.message
        },
        error => console.log(error),
        () => {
          this.saved = true;
          this.orderForm.reset();
          this.total = 0;
          localStorage.removeItem('cart');
          this.products = [];
          this.orderService.changeTotal(this.products.length);
          this.spinner.hide();
        }
      );
    }, 5000);
  }
}
