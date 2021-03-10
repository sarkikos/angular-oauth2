import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment'
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-oauth2';
  hasValidAccessToken: Boolean;
  username: '';
  orcid: '';

  constructor(private oauthService: OAuthService) {
    console.log("App component constructor");
    this.oauthService.configure(environment.authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    this.setModelFromTokens();

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.oauthService.loadUserProfile();
        this.setModelFromTokens();
      });
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  setModelFromTokens() {
    this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
    if (this.oauthService.hasValidIdToken()) {
      var identityClaims = this.oauthService.getIdentityClaims();
      console.log("Identity claims:", identityClaims);
      this.username = identityClaims['name'];
      this.orcid = identityClaims['orcid'];
    }
  }
}
