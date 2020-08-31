import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';


@NgModule({
  declarations: [ProductsComponent, ProductsDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
