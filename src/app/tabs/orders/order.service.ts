import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { viewOrders } from 'src/app/models/order';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders: viewOrders[];

  constructor(
    private http: HttpClient
  ) { }

  public acceptOrder(id: number): Observable<any> {
    return this.http.get('/market/order/acccept?id=' + id)
      .pipe(
        tap(_ => {
          let order = this.orders.find(o => o.id == id);
          order.status = false;
          order.currentstatus = 7;
        })
      )
  }

  public getOrders(status: boolean): Observable<any> {
    return this.http.get('/market/order/get?status=' + status)
      .pipe(
        tap(data => {
          this.orders = data;
        })
      )
  }
}
