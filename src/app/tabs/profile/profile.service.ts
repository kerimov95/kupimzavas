import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { user } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { UserAddress } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user = new user;

  constructor(
    private http: HttpClient
  ) { }

  public getProfile(): Observable<any> {
    return this.http.get('/market/profile/get').pipe(
      tap(data => { this.user = data })
    )
  }

  public editProfile(): Observable<any> {
    return this.http.post('/market/profile/editing', this.user)
  }

  public setDefaultAddress(address: UserAddress): Observable<any> {
    return this.http.get('/market/profile/setaddress?id=' + address.id)
      .pipe(tap(_ => {
        this.user.address = address;
      }))
  }
}
