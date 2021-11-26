import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stores, StoresType } from 'src/app/models/stores';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  public storesArr: Stores[];
  public storesTypeArr: StoresType[];

  constructor(
    private router: Router,
    private http: HttpClient) { }

  public goSettings() {
    this.router.navigateByUrl('/settings');
  }

  public loadStores(id: number): Observable<any> {
    return this.http.get('/market/stores?id=' + id)
      .pipe(
        tap(data => {
          this.storesArr = data;
        })
      )
  }

  public loadTypes(): Observable<any> {
    return this.http.get('/market/store/type')
      .pipe(
        tap(data => {
          this.storesTypeArr = data;
        }))
  }

}
