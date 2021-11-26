import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { viewOrders } from 'src/app/models/order';
import { OrderService } from '../order.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  public order: viewOrders;

  constructor(
    private orderServ: OrderService,
    private http: HttpClient) { }

  public cancelOrder(orderId: number): Observable<any> {
    return this.http.get('/market/order/cancelOrder?id=' + orderId)
      .pipe(tap(_ => {
        this.order.currentstatus = 8;
        if (this.orderServ.orders) {
          this.orderServ.orders = this.orderServ.orders.filter(r => r.id != orderId);
        }
      }));
  }

  public delete(orderId: number): Observable<any> {
    return this.http.get('/market/order/confirmrow?id=' + orderId + '&&operation=delete')
      .pipe(tap(data => {
        if (this.orderServ.orders)
          this.orderServ.orders.find(r => r.id == data.id).currentstatus = data.currentstatus;
        this.order = data;
      }));
  }

  public confirm(orderId: number): Observable<any> {
    return this.http.get('/market/order/confirmrow?id=' + orderId + '&&operation=confirm')
      .pipe(tap(data => {
        if (this.orderServ.orders)
          this.orderServ.orders.find(r => r.id == data.id).currentstatus = data.currentstatus;
        this.order = data;
      }));
  }

  public getOrder(orderId: number): Observable<any> {
    this.order = null;
    return this.http.get('/market/order/detail?id=' + orderId)
      .pipe(tap(data => {
        this.order = data;
      }))
  }
}
