import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommendationComponent } from './movie-recommendation.component';

describe('MovieRecommendationComponent', () => {
  let component: MovieRecommendationComponent;
  let fixture: ComponentFixture<MovieRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
