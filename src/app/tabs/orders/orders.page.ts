import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { viewOrders } from 'src/app/models/order';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public loadStatus: boolean;
  public currentStatus = true;
  public segment = [{ value: true, name: 'Заказы' }, { value: false, name: 'Архив' }];

  constructor(
    private util: UtilitiesService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadStatus = true;
    }, 1000);
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  private async loadOrder() {
    let load = await this.util.presentLoading();
    this.orderService.getOrders(this.currentStatus).subscribe(
      _ => load.dismiss(), _ => { load.dismiss }
    );
  }

  public get getOreders(): viewOrders[] {
    if (this.orderService.orders)
      return this.orderService.orders.sort((a, b) => a.id - b.id).reverse();
  }

  public acceptOrder(id: number) {
    this.orderService.acceptOrder(id).subscribe();
  }

  public doRefresh(event: any) {
    this.loadOrder()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  public getStatus(id: number): string {
    return this.util.statusOrder(id);
  }

  public navigate(orderId: number) {
    this.util.setValue<number>({ key: 'orderId', value: orderId });
    this.router.navigate(['home/tabs/orders/details']);
  }

}
