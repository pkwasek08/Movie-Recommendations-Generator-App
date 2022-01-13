import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieRecommendationComponent } from './components/movie-recommendation/movie-recommendation.component';
import { MoviesComponent } from './components/movies/movies.component';



const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: '', component: MovieRecommendationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
