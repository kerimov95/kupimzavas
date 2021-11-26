import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  public Products: Product[];

  constructor(
    private http: HttpClient
  ) { }

  public search(storeid: number, name: string, start: number): Observable<any> {
    return this.http.get('/market/store/productsforstore?storeid=' + storeid + '&name=' + name + '&start=' + start + '&discountOnly=true')
      .pipe(
        tap(data => {
          if (!this.Products)
            this.Products = [];
          this.Products.push.apply(this.Products, data);
        })
      )
  }
}
