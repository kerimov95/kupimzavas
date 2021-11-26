import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/models/stores';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  public groupsArr: Group[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public getGroups(StoreID: number): Observable<any> {
    return this.http.get('/market/store/groupsinstore?StoreID=' + StoreID)
      .pipe(
        tap(data => {
          this.groupsArr = data;
        }))
  }
}
