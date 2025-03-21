import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/survices/categories/category.service';

import { Icategory } from '../../../shared/interface/icategory';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Icategory[] = [];

  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoryService.getCategoriesData().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
}
