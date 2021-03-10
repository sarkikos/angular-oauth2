import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ProfileService } from '../../services/profile.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  profileExists: Boolean;
  hasValidAccessToken: Boolean;

  constructor(private oauthService: OAuthService, private profileService: ProfileService) {
    console.log("Welcome constructor: hasValidAccessToken()=", this.oauthService.hasValidAccessToken(), "hasValidIdToken()=", this.oauthService.hasValidIdToken());
    this.hasValidAccessToken = this.oauthService.hasValidAccessToken();

    this.oauthService.events.subscribe(e => console.log("Welcome received event", e));

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.hasValidAccessToken = true;
        console.log("Welcome constructor. Token reveiced");
      });

    this.oauthService.events
      .pipe(filter(e => e.type === 'discovery_document_loaded' && e.info))
      .subscribe(_ => {
        console.log("Welcome received discovery_document_loaded: hasValidAccessToken()=", this.oauthService.hasValidAccessToken(), "hasValidIdToken()=", this.oauthService.hasValidIdToken());
        this.oauthService.loadUserProfile();
      });
    
  }

  ngOnInit() {
  }

  checkProfileExists() {
    this.profileService.checkProfileExists().subscribe((data) => console.log(data));
  }

  createProfile() {
    this.profileService.createProfile().subscribe((data) => console.log(data));
  }

  deleteProfile() {
    this.profileService.deleteProfile().subscribe((data) => console.log(data));
  }
}
