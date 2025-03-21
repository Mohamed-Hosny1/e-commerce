import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/survices/brands/brands.service';
import { IBrands } from '../../../shared/interface/ibrands';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brands: IBrands[] = [];

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
    });
  }
}
