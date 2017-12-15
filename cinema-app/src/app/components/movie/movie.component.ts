import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent {

  movieData: any = {};
  movieId: string;
	scheduleData: any = {};

	movieTitle: string;

	private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.movieId = params['id'] );
    this.getMovieData();
    this.getMovies();
		//this.getScheduleData();
		//this.getMovieSchedule();
  }

  getMovieData() {
    return this.http.get('https://api.camerongough.co.uk/api/v1/movies/' + this.movieId)
      .map((res: Response) => res.json())
  }

  getMovies() {
    this.getMovieData().subscribe(movie => {
      //console.log(movie);
      this.movieData = movie;
    })
  }

	getScheduleData() {
		return this.http.get('https://api.camerongough.co.uk/api/v1/schedule/' + this.movieId)
			.map((res: Response) => res.json())
	}

	getMovieSchedule() {
		this.getScheduleData().subscribe(schedule => {
			var content = schedule.schedule;
			//var test = JSON.parse(content);
			// for (var item of content) {
			// 	console.log(item.day_week);
			// }
			console.log(content);

			this.scheduleData = schedule;
		})
	}

	addToWatchList() {
		const token = localStorage.getItem('token');
		console.log(token);
		let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: token
    });
		let movie = {
			movieId: this.movieId
		};
		return this.http.post('https://api.camerongough.co.uk/api/v1/user/watch_list', movie, { headers: headers }).toPromise();
	}

}
