import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/stores';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public categories: Category[];
  public Products: Product[];

  constructor(
    private http: HttpClient
  ) { }

  public loadCategories(groupId: number): Observable<any> {
    return this.http.get('/market/store/categories?id=' + groupId)
      .pipe(
        tap((data: Category[]) => {
          this.categories = data.sort((a, b) => a.name.localeCompare(b.name))
        }));
  }

  public loadProducts(storeId: number, categoryId: number, start = 0): Observable<any> {
    return this.http.get('/market/store/productsforstore?storeid=' + storeId + '&start=' + start + '&categoryid=' + categoryId)
      .pipe(tap((data: Product[]) => {
        if (!this.Products)
          this.Products = [];
        this.Products.push.apply(this.Products, data);
      }))
  }
}
