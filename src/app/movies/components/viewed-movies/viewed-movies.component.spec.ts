import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedMoviesComponent } from './viewed-movies.component';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from '../../services/movies-store/movies.reducer';

describe('ViewedMoviesComponent', () => {
  let component: ViewedMoviesComponent;
  let fixture: ComponentFixture<ViewedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewedMoviesComponent, StoreModule.forRoot({ movies: moviesReducer })]
    });
    fixture = TestBed.createComponent(ViewedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
