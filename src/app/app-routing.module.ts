import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(mod => mod.ProductsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(mod => mod.CategoriesModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(mod => mod.OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
