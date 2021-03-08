import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [],
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
