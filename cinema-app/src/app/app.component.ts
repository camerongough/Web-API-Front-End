import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserLogin } from './models/userLogin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;

  user: UserLogin = new UserLogin();

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
        .then((user) => {
          console.log(user.json());
          if (user.json().status === 'success') {
            this.loggedIn = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

	onLogin() {
		console.log('test');
    this.auth.login(this.user)
      .then((user) => {
        localStorage.setItem('token', user.json().token);
				this.loggedIn = true;
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onLogout() {
		let token = localStorage.getItem('token');
		this.auth.logout(token);
  }


}
