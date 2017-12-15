import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	email: string;
	password: string;

  constructor(private router: Router, private auth: AuthService){}

  onLogin(email, password): void {
		let user = {email: email, password: password}
    this.auth.login(user)
      .then((user) => {
        localStorage.setItem('token', user.json().token);
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
