import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const autenticacionGuard: CanActivateFn = () => {
  const plataforma = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isPlatformBrowser(plataforma) || authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const soloInvitadosGuard: CanActivateFn = () => {
  const plataforma = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isPlatformBrowser(plataforma) || !authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/inicio']);
};
