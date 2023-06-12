import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { canActivateChild } from './auth/_services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.route'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    canActivateChild:[canActivateChild],
    loadChildren: () => import('./movies/movies.route'),
  },

  {
    path: '404', // Route pour la page de 404 "Not Found"
    component: ErrorPageComponent,
  },

  {
    path: '**',
    redirectTo: '/404', // Redirige toutes les autres routes vers la page d'erreur
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
