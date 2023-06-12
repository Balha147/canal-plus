import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../../shared/service/storage.service";
import { catchError, map, of } from "rxjs";

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return canActivate(route, state);
};

export const canActivate: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const authService = inject(StorageService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']); // Redirige vers la page d'erreur si l'utilisateur n'est pas connecté
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/error']); // Redirige vers la page d'erreur en cas d'erreur
      return of(false);
    })
  );
};

