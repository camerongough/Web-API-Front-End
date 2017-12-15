import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'https://api.camerongough.co.uk/api/v1/auth';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  login(user: UserLogin): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, { headers: this.headers }).toPromise();
  }

  logout(token): Promise<any> {
    let url: string = `${this.BASE_URL}/logout`;
		let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
    localStorage.removeItem('token');
		return this.http.post(url, { headers: this.headers }).toPromise();
  }

  register(user: UserRegister): Promise<any> {
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
