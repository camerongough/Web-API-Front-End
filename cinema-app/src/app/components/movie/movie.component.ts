import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent {

  data: any = {};
  movieId: string;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.movieId = params['id'] );
    this.getData();
    this.getMovies();
  }

  getData() {
    return this.http.get('http://207.154.211.202:3000/api/v1/movies/' + this.movieId)
      .map((res: Response) => res.json())
  }

  getMovies() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }
}
