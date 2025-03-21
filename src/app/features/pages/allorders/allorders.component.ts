import { Component, inject, OnInit } from '@angular/core';
import { AllOrdersService } from '../../../core/survices/allOrders/all-orders.service';
import { IOrders } from '../../../shared/interface/iorders';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly allOrdersService = inject(AllOrdersService);
  orders: IOrders[] = [];

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.allOrdersService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        console.log(this.orders);
      },
    });
  }
}
