import { AuthService } from '../services/auth.services';
import { inject } from '@angular/core';
import type { CanActivateFn, CanMatchFn, Route, UrlSegment } from '@angular/router';


export const authGuardActivate: CanActivateFn = (route, state) => {
  console.log('authGuardActivate');
  const authService = inject (AuthService)
  return (authService.checkAuthentication())
};

export const authGuardMatch:CanMatchFn = (route: Route, segments: UrlSegment[])  => {
  console.log('authGuardMatch');
  const authService = inject (AuthService)
  return (authService.checkAuthentication())
};





