import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/service/movies/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public isShowSpinner = true;
  public moviesList: Movie[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(moviesList => {
      this.moviesList = moviesList;
      let index = 1;
      this.moviesList.forEach(movie => {
        movie.index = index;
        index++;
      });
      this.isShowSpinner = false;
    });
  }

}
