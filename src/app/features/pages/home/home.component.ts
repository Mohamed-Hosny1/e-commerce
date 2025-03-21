import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/survices/products/products.service';
import { Iproduct } from '../../../shared/interface/iproduct';
import { CategoryService } from '../../../core/survices/categories/category.service';
import { Icategory } from '../../../shared/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../../shared/pipe/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/survices/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productSurvice = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  MySearch: string = '';
  products: Iproduct[] = [];
  categories: Icategory[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    rtl: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
  };
  ngOnInit(): void {
    this.getProducts();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategoriesData().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  getProducts() {
    this.productSurvice.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh cart');
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      },
    });
  }
}
