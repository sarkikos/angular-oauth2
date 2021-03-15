import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) {}

  // Read configuartion file
  loadAppConfig() {
    return this.http
      .get('assets/config/config.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }

  // Profile API Url
  get profileApiUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.profileApiUrl;
  }
}