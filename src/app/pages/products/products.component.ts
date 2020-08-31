import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Subscription;
  products: IProduct[] = [];
  term: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.products$ = this.productService.getAll().subscribe(
      (data: IProduct[]) => this.products = data
    )
  }

  search(): void {
    let search = this.products.filter(product => product.title == this.term)
    console.log(search)
  }

  detail(id: string): void {
    this.router.navigateByUrl(`products/${id}`)
  }

}
