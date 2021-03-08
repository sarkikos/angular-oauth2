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
  hasValidTokens: Boolean;
  username: '';
  orcid: '';

  constructor(private oauthService: OAuthService) {
    console.log("App component ctor");
    this.oauthService.configure(environment.authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.setModelFromTokens();

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
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
    this.hasValidTokens = this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
    if (this.hasValidTokens) {
      var identityClaims = this.oauthService.getIdentityClaims();
      console.log("Identity claims:", identityClaims);
      this.username = identityClaims['name'];
      this.orcid = identityClaims['orcid'];
    }
  }
}
