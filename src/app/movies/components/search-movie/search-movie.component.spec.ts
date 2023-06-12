import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieComponent } from './search-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { MoviesState } from '../../services/movies-store/movies.store';
import { moviesReducer } from '../../services/movies-store/movies.reducer';

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, StoreModule.forRoot({ movies: moviesReducer })],
     });
    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.get('searchQuery')).toBeTruthy();
    expect(component.form.get('sortBy')).toBeTruthy();
  });
});
