import { Component, inject, Inject, Input } from '@angular/core';
import { FlowbiteService } from '../../../core/survices/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/survices/Auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/survices/myTranslate/my-translate.service';
import { CartService } from '../../../core/survices/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  cartCount!: number;
  @Input() showLinks: boolean = true;
  readonly authService = inject(AuthService);
  readonly myTranslateService = inject(MyTranslateService);
  readonly translateService = inject(TranslateService);
  readonly cartService = inject(CartService);

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      this.cartService.cartNumber.subscribe({
        next: (value) => {
          this.cartCount = value;
          this.cartService.getLoggedUserCart().subscribe({
            next: (res) => {
              this.cartService.cartNumber.next(res.numOfCartItems);
            },
          });
        },
      });
    });
  }
  changeLang(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}
