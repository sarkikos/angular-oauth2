import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  userData$: Observable<string>;
  editorData: Object;

  constructor(public oidcSecurityService: OidcSecurityService, private profileService: ProfileService) {
    this.editorData = null;
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.userData$;
  }

  checkProfileExists() {
    this.profileService.checkProfileExists().subscribe((response) => console.log(response));
  }

  createProfile() {
    this.profileService.createProfile().subscribe((response) => console.log(response));
  }

  deleteProfile() {
    this.profileService.deleteProfile().subscribe((response) => console.log(response));
  }

  getOrcidData() {
    this.profileService.getOrcidData().subscribe((response) => console.log(response));
  }

  getProfileData() {
    this.editorData = null;
    this.profileService.getProfileData().subscribe((response) => {
      console.log(response);
      this.editorData = response['data'];
    });
  }

  patchProfileDataSingle(item) {
    let patchItem = {
      id: item.id,
      show: !item.show
    };
    this.profileService.patchProfileDataSingle(patchItem).subscribe((response) => console.log(response));
  }
}
