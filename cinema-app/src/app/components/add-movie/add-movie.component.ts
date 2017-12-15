import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieIdTitle: any = {};
  movieData: any = {};
  movie: string;
  year: number;
  movieId: string;

  movie_id: string;
  title: string;
  poster_path: string;
  certification: string;
  director: string;
  homepage: string;
  overview: string;
  release_date: string;
  cast: any = [];
  runtime: number;

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  findMovieID() {
    //console.log(this.title);
    return this.http.get('https://api.camerongough.co.uk/api/v1/movies/find_id', { params: { movie: this.movie, year: this.year } })
      .map((res: Response) => res.json())
  }

  getMovieID() {
    this.findMovieID().subscribe(movie => {
      console.log(movie);
      this.movieIdTitle = movie;
      this.movieId = movie.movieId;
    })
  }
  onFindIdFormSubmit() {
    this.getMovieID()
  }

  findMovieDetails() {
    return this.http.get('https://api.camerongough.co.uk/api/v1/movies/get_details', { params: { movieId: this.movieId } })
      .map((res: Response) => res.json())
  }

  getMovieDetails() {
    this.findMovieDetails().subscribe(movie => {
      console.log(movie);
      this.movieData = movie;
      this.movie_id = movie.movie_id;
      this.title = movie.title;
      this.certification = movie.certification;
      this.director = movie.director;
      this.poster_path = movie.poster_path;
      this.homepage = movie.homepage;
      this.overview = movie.overview;
      this.release_date = movie.release_date;
      this.runtime = movie.runtime;
      this.cast = movie.cast;
    })
  }

  onGetMovieDetailsSubmit() {
    this.getMovieDetails()
  }

  onSaveMovieSubmit(): Promise<any> {
    let movieDetails = {
      movie_id: this.movie_id,
      title: this.title,
      poster_path: this.poster_path,
      certification: this.certification,
      director: this.director,
      homepage: this.homepage,
      overview: this.overview,
      release_date: this.release_date,
      cast: this.cast,
      runtime: this.runtime
    };
    return this.http.post('https://api.camerongough.co.uk/api/v1/movies', movieDetails, { headers: this.headers }).toPromise();
  }
  ngOnInit() {
  }

}
