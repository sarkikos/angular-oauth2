  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { Welcome2Component } from './components/welcome2/welcome2.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'welcome2',
    pathMatch: 'full',
    component: Welcome2Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    pathMatch: 'full',
    component: WelcomeComponent,
    canActivate: [],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }