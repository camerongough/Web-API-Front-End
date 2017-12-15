import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../models/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
	email: string;
	password: string;
	name: string;
	dateOfBirth: string;
  //user: UserRegister = new UserRegister();
  constructor(private auth: AuthService) {}

  onRegister(email, password, name, dateOfBirth): void {
		let user = {
			email: email,
			password: password,
			name: name,
			dateOfBirth: dateOfBirth
		}
    this.auth.register(user)
    .then((user) => {
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
