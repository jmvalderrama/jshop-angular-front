import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from '../models/product';
import { IHttpResponse } from '../models/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl: string = 'https://jshop-api.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get(this.baseUrl).pipe(map((response: IHttpResponse) => response.data));
  }

  get(id: string): Observable<IProduct> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response: IHttpResponse) => response.data));
  }
}
