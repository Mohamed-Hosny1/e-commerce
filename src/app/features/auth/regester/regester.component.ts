import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/survices/Auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-regester',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './regester.component.html',
  styleUrl: './regester.component.scss',
})
export class RegesterComponent {
  errorMsg: string = '';
  isLoading: boolean = false;
  successMsg: string = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isLoading = false;
            this.successMsg = res.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;
    return password === repassword ? null : { mismatch: true };
  }
}
