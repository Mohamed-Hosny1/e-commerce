import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../core/survices/Auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: number = 1;
  verifyUserEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  resetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z]\w{7,}$/),
    ]),
  });

  emailVerification(): void {
    this.authService.emailVerify(this.verifyUserEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
    });
  }
  codeVerification(): void {
    this.authService.codeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
    });
  }
  resetPasswordSubmit(): void {
    this.authService.resetPass(this.resetPass.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.getUserData();
        this.router.navigate(['/home']);
      },
    });
  }
}
