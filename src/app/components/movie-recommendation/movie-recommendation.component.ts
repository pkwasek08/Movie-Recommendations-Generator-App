import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/service/movies/movies.service';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.css']
})
export class MovieRecommendationComponent implements OnInit {
  movieTitle = new FormControl('', [
    Validators.required,
  ]);
  public isShowSpinner = false;
  public moviesList: Movie[] = [];
  public generateMoviesList: Movie[] = [];

  constructor(private moviesService: MoviesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initMoviesList();
  }

  initMoviesList() {
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

  public generate() {
    if (this.movieTitle.valid) {
      let inputId = this.getInputIdMovie();
      if (inputId) {
        this.isShowSpinner = true;
        this.moviesService.generateMovieListByTitle(inputId).subscribe(movie => {
          console.log(movie);
          if (movie) {
            this.generateMoviesList = [];
            this.generateMoviesList.push(movie);
            let index = 1;
            this.generateMoviesList.forEach(movie => {
              movie.index = index;
              index++;
            });
          }
          else {
            this.snackBar.open('No result', 'x', {
              panelClass: 'custom-css-class-info',
              duration: 5000,
            });
          }
          this.isShowSpinner = false;
        })
      }
    }
  }

  private getInputIdMovie() {
    let filtredList = this.moviesList.filter(movie => movie.title == this.movieTitle.value);
    if (filtredList.length != 0) {
      return filtredList[0].id;
    } else {
      this.snackBar.open('Unexpected error', 'x', {
        panelClass: 'custom-css-class-error',
        duration: 5000,
      });
      return null;
    }
  }
}
