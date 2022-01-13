import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apiUrl = environment.apiUrl + 'movie';
  constructor(private http: HttpClient) { 
  }

  public getAllMovies() {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  public generateMovieListByTitle(id: number){
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Movie>(this.apiUrl + '/generate?' + params);

  }
}
