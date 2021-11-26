import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserAddress } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public adresses: UserAddress[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public addAddress(address: UserAddress): Observable<any> {
    return this.http.post('/market/address/add', address).pipe(
      tap((data) => {
        this.adresses.push(data);
      })
    );
  }

  public deleteAddress(id: number): Observable<any> {
    return this.http.delete('/market/address/delete?id=' + id)
      .pipe(tap(_ => {
        this.adresses = this.adresses.filter(a => a.id != id);
      }))
  }

  public getAddresses() {
    this.adresses = [];
    return this.http.get('/market/address/get').pipe(
      tap((data: UserAddress[]) => {
        this.adresses = data;
      })
    );
  }
}
