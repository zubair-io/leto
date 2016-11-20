import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'index_uwp.html', component: HomeComponent },
  {path: 'index_electron.html', component: HomeComponent }
];


export const AppRouting = RouterModule.forRoot(routes);
