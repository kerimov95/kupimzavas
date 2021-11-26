import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { order, nomenclaturefororders, Deliverytype, typeagreement } from 'src/app/models/order';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { basket } from 'src/app/models/basket';
import { BasketService } from '../basket.service';
import { UserAddress } from 'src/app/models/address';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public delivery: Deliverytype[];
  public typeagreement: typeagreement[];
  public currentAddress: UserAddress;

  constructor(
    private http: HttpClient,
    private util: UtilitiesService
  ) { }

  public getDefaultAddress(): Observable<any> {
    return this.http.get('/market/address/getdefault')
      .pipe(tap(data => {
        this.currentAddress = data;
      }));
  }

  public getPeriod(): Observable<any> {
    return this.http.get('/market/order/delivery')
      .pipe(tap(data => {
        this.delivery = data;
      }));
  }

  public getAgreements(): Observable<any> {
    return this.http.get('/market/order/typeagreements')
      .pipe(tap(data => {
        this.typeagreement = data;
      }));
  }

  public async createOrder(addressid: number, deliveryid: number, agreementid: number): Promise<any> {

    let basket = this.util.getValue<basket>('basket').value
    let newOrder = new order();
    newOrder.addressid = addressid;
    newOrder.deliverytypeid = deliveryid;
    newOrder.typeagreementid = agreementid;
    newOrder.storeid = basket.storeid;
    newOrder.servicepriceid = basket.servicePrice.id;
    newOrder.nomenclaturefororders = [];
    basket.poructs.forEach(row => {
      let newRow = new nomenclaturefororders();
      newRow.confirm = true;
      newRow.initcount = row.count;
      newRow.nomenclatureforstoreid = row.id;
      newOrder.nomenclaturefororders.push(newRow)
    })

    return this.http.post('/market/order/addoreder', newOrder).toPromise();

  }

}
