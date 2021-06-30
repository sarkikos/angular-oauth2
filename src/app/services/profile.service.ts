import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AppConfigService } from './app-config-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl: string;
  httpOptions: object;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    public oidcSecurityService: OidcSecurityService,
  ) {
    this.apiUrl = this.appConfigService.profileApiUrl;
  }

  updateTokenInHttpAuthHeader() {
    var token = this.oidcSecurityService.getToken();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };
  }

  checkProfileExists() {
    this.updateTokenInHttpAuthHeader();
    return this.http.get(this.apiUrl + '/userprofile/', this.httpOptions);
  }

  createProfile() {
    this.updateTokenInHttpAuthHeader();
    return this.http.post(this.apiUrl + '/userprofile/', null, this.httpOptions);
  }

  deleteProfile() {
    this.updateTokenInHttpAuthHeader();
    return this.http.delete(this.apiUrl + '/userprofile/', this.httpOptions);
  }

  getOrcidData() {
    this.updateTokenInHttpAuthHeader();
    return this.http.get(this.apiUrl + '/orcid/', this.httpOptions);
  }

  getProfileData() {
    this.updateTokenInHttpAuthHeader();
    return this.http.get(this.apiUrl + '/profiledata/', this.httpOptions);
  }

  patchProfileDataSingleGroup(group) {
    this.updateTokenInHttpAuthHeader();
    let body = { groups: [group], items: [] };
    return this.http.patch(this.apiUrl + '/profiledata/', body, this.httpOptions);
  }

  patchProfileDataSingleItem(item) {
    this.updateTokenInHttpAuthHeader();
    let body = { groups: [], items: [item] };
    return this.http.patch(this.apiUrl + '/profiledata/', body, this.httpOptions);
  }

  addPublication(publicationId1, publicationId2) {
    this.updateTokenInHttpAuthHeader();
    let body = [];
    if (publicationId1 != "") {
      body.push(
        { publicationId: publicationId1, show: true }
      );
    }
    if (publicationId2 != "") {
      body.push(
        { publicationId: publicationId2, show: true }
      );
    }
    return this.http.post(this.apiUrl + '/publication/', body, this.httpOptions);
  }

  removePublication(publicationId) {
    this.updateTokenInHttpAuthHeader();
    let url = this.apiUrl + '/publication/' + publicationId;
    return this.http.delete(url, this.httpOptions);
  }
}