import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cartTotal$ = new BehaviorSubject<number>(0);
  private readonly baseUrl: string = 'http://localhost:3000/api/orders';

  constructor(
    private http: HttpClient
  ) {
    this.checkStorage();
  }

  private checkStorage(): void {
    if (localStorage.getItem('cart') != null) {
      let data = JSON.parse(localStorage.getItem('cart'));
      this.changeTotal(data.length);
    } else {
      this.changeTotal(0);
    }
  }

  changeTotal(value: number): void {
    this.cartTotal$.next(value);
  }

  save(order: IOrder): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }
}
