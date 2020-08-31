import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../models/product';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  productId: string;
  product: IProduct;
  isLoaded: boolean = false;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getParams();
    this.getProduct();
  }

  private getParams() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
    })
  }

  private getProduct() {
    this.productService.get(this.productId).subscribe(
      (response: IProduct) => {
        if (response) this.product = response
      },
      err => console.log(err),
      () => {
        this.isLoaded = true;
        this.spinner.hide();
      }
    )
  }

  add(product: IProduct): void {
    let data: IProduct[];
    localStorage.getItem('cart') == null ? data = [] : data = JSON.parse(localStorage.getItem('cart'));
    product.price = this.quantity * product.price;
    product.quantity = this.quantity;
    data.push(product);
    this.orderService.changeTotal(data.length);
    localStorage.setItem('cart', JSON.stringify(data));
    this.router.navigateByUrl('/products');
  }

}
