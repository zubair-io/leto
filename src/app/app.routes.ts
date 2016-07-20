import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './components/home';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  {path: 'index_uwp.html', component: HomeComponent },
  {path: 'index_electron.html', component: HomeComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
