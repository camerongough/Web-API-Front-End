import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	watchList: any = [];
	token: string;
	userData: any = {};
	private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private auth: AuthService, private http: Http) {
		this.token = localStorage.getItem('token');
		this.getUserData();
		this.getUser();
	}

	getUserData() {
		let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: this.token
    });
		return this.http.get('https://api.camerongough.co.uk/api/v1/auth/profile', { headers: headers })
			.map((res: Response) => res.json())
	}

	getUser() {
		this.getUserData().subscribe(user => {
			console.log(user);
			this.userData = user;
			this.watchList = user.watchList; 
		})
	}
}
