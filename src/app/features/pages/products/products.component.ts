import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../core/survices/products/products.service';
import { Iproduct } from '../../../shared/interface/iproduct';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipe/search/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/survices/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [FormsModule, SearchPipe, RouterLink, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productSurvice = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  products: Iproduct[] = [];
  MySearch: string = '';
  getProducts() {
    this.productSurvice.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
  }
  ngOnInit(): void {
    this.getProducts();
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
