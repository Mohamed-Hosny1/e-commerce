import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../shared/Auth/auth';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(private _http: HttpClient) {}
  private readonly router = inject(Router);
  sendRegisterForm(formData: Auth): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      formData
    );
  }
  sendLoginForm(formData: Auth): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      formData
    );
  }
  getUserData(): void {
    this.userData = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userData);
  }

  logOutUser(): void {
    // 1-remove token
    localStorage.removeItem('token');

    // 2-make userData empty
    this.userData = null;

    // 3-navigate to Login
    this.router.navigate(['/login']);
  }

  emailVerify(formData: Auth): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      formData
    );
  }
  codeVerify(formData: Auth): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      formData
    );
  }
  resetPass(formData: Auth): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      formData
    );
  }
}
