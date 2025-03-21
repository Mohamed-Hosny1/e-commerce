import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/survices/cart/cart.service';
import { Icart } from '../../../shared/interface/icart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cartData: Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
    });
  }
  removeCartData(id: string): void {
    this.cartService.removeItemData(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.toastrService.info('item is removed');
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }
  updateQuantity(id: string, count: number): void {
    this.cartService.updateItemData(id, count).subscribe({
      next: (res) => {
        this.cartData = res.data;

        this.toastrService.success('new update is complete');
      },
    });
  }
  clearCartData(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartData = {} as Icart;
          this.cartService.cartNumber.next(0);
        }
      },
    });
  }
}
