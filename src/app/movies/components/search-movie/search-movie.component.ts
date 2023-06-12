import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { TriModel } from '../../models/movies.model';
import { KEY_SORT_MOVIES } from '../../config/tri-movies.config';
import { Store, select } from '@ngrx/store';
import { MoviesState } from '../../services/movies-store/movies.store';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
})
export class SearchMovieComponent implements OnInit {
  sortItems: TriModel[] = KEY_SORT_MOVIES;

  loading: boolean = false;


  form: FormGroup = new FormGroup({
    searchQuery: new FormControl(''),
    sortBy: new FormControl(''),
  })

  @Output() dataMoviesEmmiter: EventEmitter<{ searchQuery: string, sortBy: string }> = new EventEmitter<{ searchQuery: string, sortBy: string }>();

  private store = inject(Store<MoviesState>);

  ngOnInit(): void {
    this.store.pipe(select(state => state.movies.lastSearchQuery), take(1)).subscribe(lastSearchQuery => {
      this.form.patchValue({ searchQuery: lastSearchQuery });
    });

    this.store.pipe(select(state => state.movies.lastSortBy), take(1)).subscribe(lastSortBy => {
      this.form.patchValue({ sortBy: lastSortBy });
    });
  }

  onSearchMovies(): void {
    const searchQuery = this.form.get('searchQuery')?.value;
    const sortBy = this.form.get('sortBy')?.value;
    this.dataMoviesEmmiter.emit({ searchQuery, sortBy });
  }

}
