import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly httpClient: HttpClient) {}
  myToken: any = localStorage.getItem('token');
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  removeItemData(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  updateItemData(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }
}
