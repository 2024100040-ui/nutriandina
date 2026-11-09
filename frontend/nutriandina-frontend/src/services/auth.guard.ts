import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationToken } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationToken);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
