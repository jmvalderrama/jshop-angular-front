import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICategory } from '../models/category';
import { IHttpResponse } from '../models/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl: string = 'https://jshop-api.herokuapp.com/api/categories';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ICategory[]> {
    return this.http.get(this.baseUrl).pipe(map((response: IHttpResponse) => response.data));
  }

  get(id: string): Observable<ICategory> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response: IHttpResponse) => response.data));
  }
}
