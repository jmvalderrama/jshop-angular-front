import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ICategory } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[];
  idSelected: string;
  selected: ICategory;
  categories$: Subscription;
  isLoaded: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categories$ = this.categoryService.getAll().subscribe(
      (data: ICategory[]) => this.categories = data
    );
  }

  search(): void {
    this.isLoaded = false;
    this.categoryService.get(this.idSelected).subscribe(
      (data: ICategory) => this.selected = data,
      error => console.log(error),
      () => this.isLoaded = true
    );
  }

  detail(id: string): void {
    this.router.navigateByUrl(`products/${id}`)
  }

}
