import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService, OidcSecurityService, LogLevel } from 'angular-auth-oidc-client';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment'


export function configureAuth(oidcConfigService: OidcConfigService, httpClient: HttpClient) {
  const setupAction$ = httpClient.get<any>(`assets/config/config.json`).pipe(
    map((configJson) => {
      return configJson.authConfig;
    }),
    switchMap((config) => oidcConfigService.withConfig(config))
  );

  return () => setupAction$.toPromise();
}

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService, HttpClient],
      multi: true,
    },
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}