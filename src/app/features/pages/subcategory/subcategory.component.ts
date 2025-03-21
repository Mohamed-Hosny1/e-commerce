import { ActivatedRoute } from '@angular/router';

import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/survices/categories/category.service';
import { Icategory } from '../../../shared/interface/icategory';

@Component({
  selector: 'app-subcategory',
  imports: [],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss',
})
export class SubcategoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  subCategoryDetails: Icategory[] = [];
  categoryId: any;
  categoryName: any;

  ngOnInit(): void {
    this.getSubCategory();
  }

  getSubCategory(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.categoryId = res.get('id');
        this.categoryName = res.get('name');

        this.categoryService
          .getSubCategoriesInCategory(this.categoryId)
          .subscribe({
            next: (res) => {
              this.subCategoryDetails = res.data;
            },
          });
      },
    });
  }
}
