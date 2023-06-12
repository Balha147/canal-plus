import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './auth/_helpers/http.interceptor';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './movies/services/movies-store/movies.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavBarComponent,
    StoreModule.forRoot({ movies: moviesReducer }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
