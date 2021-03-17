import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-welcome2',
  templateUrl: './welcome2.component.html',
  styleUrls: ['./welcome2.component.css']
})
export class Welcome2Component implements OnInit {
  isAuthenticated$: Observable<boolean>;
  userData$: Observable<string>;

  constructor(public oidcSecurityService: OidcSecurityService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.userData$;
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