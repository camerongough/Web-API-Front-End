import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'movie', component:MovieComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
