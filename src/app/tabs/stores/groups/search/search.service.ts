import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public Products: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public search(storeid: number, name: string, start: number): Observable<any> {
    return this.http.get('/market/store/productsforstore?storeid=' + storeid + '&name=' + name + '&start=' + start)
      .pipe(
        tap(data => {
          if (!this.Products)
            this.Products = [];
          this.Products.push.apply(this.Products, data);
        })
      )
  }
}
