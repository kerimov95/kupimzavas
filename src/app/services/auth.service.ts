import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class authService {

  constructor(
    private http: HttpClient,
    private util: UtilitiesService
  ) { }

  public getcode(login): Observable<any> {
    return this.http.get('/auth/getcode?phone=' + login)
      .pipe()
  }

  public inLogin(login: string, password: string): Observable<any> {
    return this.http.post('/auth/SingnIn', { login: login, password: password })
      .pipe(
        tap(data => {
          this.util.setValue<login>({ key: 'token', value: { role: data.name, token: data.access_token } });
        })
      )
  }

  public checkLogin(): boolean {
    let value = this.util.getValue<login>('token');

    if (value && value.value.role == 'user')
      return true;
    else
      return false;
  }

}
