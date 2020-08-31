import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  count: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getCount();
  }

  private getCount(): void {
    this.orderService.cartTotal$.subscribe(total => this.count = total);
  }

}
