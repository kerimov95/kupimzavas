import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productDetail } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Params } from 'src/app/services/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {

  public productDetail: productDetail;

  constructor(
    private http: HttpClient
  ) { }

  public getProduct(id: number): Observable<any> {
    this.productDetail = null;
    return this.http.get('/market/store/productdetail?id=' + id)
      .pipe(tap(data => {
        this.productDetail = data;
      }))
  }
}
