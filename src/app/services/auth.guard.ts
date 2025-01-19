import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isLoggedIn()) {
    return true; // Allow access to the route
  } else {
    authService.logout().subscribe(); // Log out the user
    return router.createUrlTree(['/login']); // Redirect to the login page
  }
};