import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.oidcSecurityService.checkAuth().pipe(
          tap((isAuthenticated) => {
              if (!isAuthenticated) {
                  alert("Blocked by AuthGuard");
                  this.router.navigate(["/"]);
              }
          })
      );
  }
}
