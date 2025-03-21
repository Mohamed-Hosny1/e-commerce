import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegesterComponent } from './features/auth/regester/regester.component';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { authGuard } from './core/guard/auth.guard';
import { loggedGuard } from './core/guard/logged.guard';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { ForgotPasswordComponent } from './features/pages/forgotPass/forgot-password/forgot-password.component';
import { CheckoutComponent } from './features/pages/checkout/checkout.component';
import { AllordersComponent } from './features/pages/allorders/allorders.component';
import { SubcategoryComponent } from './features/pages/subcategory/subcategory.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'signup', component: RegesterComponent, title: 'SignUp' },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
        canActivate: [authGuard],
        children: [
          { path: 'subcategory/:id/:name', component: SubcategoryComponent },
        ],
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
        canActivate: [authGuard],
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout',
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'allorders',
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'notFound Page',
  },
];
