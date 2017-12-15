import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { StatusComponent } from './components/status/status.component';

import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { AdminComponent } from './components/admin/admin.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path: 'register',
    component: RegisterComponent//,
    //canActivate: [LoginRedirect]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirect]
  },
  {
    path: 'profile',
    component: ProfileComponent,
		canActivate: [EnsureAuthenticated]
  },
  {
    path: 'status',
    component: StatusComponent,
    canActivate: [EnsureAuthenticated]
  },
	{
		path: 'admin',
		//component: AdminComponent,
		children: [
			{ path: 'add_movie', component: AddMovieComponent }
		]
	}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    StatusComponent,
    AdminComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    LoginRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }
