import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http : HttpClient) { }

  getlogin() {
    return this.http.get<any>("http://localhost:3000/account")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token')!=null;
  }
}
