import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://207.154.211.202:3000/api/v1/auth';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, { headers: this.headers }).toPromise();
  }

  logout() {
    let url: string = `${this.BASE_URL}/logout`;
    localStorage.removeItem('token');
  }

  register(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, { headers: this.headers }).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
    return this.http.get(url, { headers: headers }).toPromise();
  }

}
