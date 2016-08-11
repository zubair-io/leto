import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'index_uwp.html', component: HomeComponent },
  {path: 'index_electron.html', component: HomeComponent }
];


export const routing = RouterModule.forRoot(routes);
