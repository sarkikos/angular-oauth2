import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth-config.module';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppConfigService } from './services/app-config-service.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RedirectComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule
  ],
  providers: [
    AppConfigService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        // Load configuration from file when application starts.
        return () => {
          return appConfigService.loadAppConfig();
        };
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
