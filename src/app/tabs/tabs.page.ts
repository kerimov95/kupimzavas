import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Plugins, PushNotificationActionPerformed, PushNotification } from "@capacitor/core";
import { AlertController } from '@ionic/angular';
import { OrderService } from './orders/order.service';
import { Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
const { PushNotifications } = Plugins;


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private basket: BasketService,
    private router: Router,
    private orderService: OrderService,
    private alertController: AlertController,
    private util: UtilitiesService,
  ) {
  }

  ngOnInit() {
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        if (this.orderService.orders)
          this.updateStatus(notification.data.id, parseInt(notification.data.status));
        let message = notification.data.status == 3 ? 'Изменился статус заказа ' + notification.data.id + '. Требуется подтверждение' :
          'Изменился статус заказа ' + notification.data.id + '. Новый статус ' + this.getStatus(parseInt(notification.data.status));
        alert(message);
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        if (this.orderService.orders)
          this.updateStatus(notification.notification.data.id, parseInt(notification.notification.data.status));
      }
    );
  }

  public updateStatus(id: number, status: number) {
    let order = this.orderService.orders.find(r => r.id == id);
    order.currentstatus = status;
  }

  public getStatus(id: number): string {
    return this.util.statusOrder(id);
  }

  public getTotal(): any {
    return this.basket.getTotal();
  }
}