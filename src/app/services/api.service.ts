import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Params } from './AppConfig';
import { UtilitiesService } from './utilities.service';
import { login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  constructor(
    private router: Router,
    private app: Params,
    private util: UtilitiesService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    let value = this.util.getValue<login>('token');
    if (value)
      token = value.value.token;
    else
      token = this.app.guestKey;

    const request = req.clone({
      url: this.app.baseApiPath + req.url,
      headers: req.headers.set(
        'Authorization', token
      )
    });
    this.util.statusLoad = true;
    return next.handle(request)
      .pipe(tap(_ => this.util.statusLoad = false, error => {
        this.util.statusLoad = false;
        if (error.status == 401 || error.status == 403) {
          localStorage.removeItem('token');
          this.router.navigate(['/login'])
        } else {
          this.router.navigate(['/error'])
        }
      }))
  }
}

