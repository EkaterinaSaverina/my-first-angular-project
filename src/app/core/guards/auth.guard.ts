import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isUnderfined } from 'lodash';

import { UsersService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.usersService.isAuthorized()
      .pipe(
        filter(isAuth => {
          return !isUnderfined(isAuth);
        }),
        map(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/login']);
          }
          return isAuth;
        })
      );
  }

}
