//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformUniversalDynamic } from 'angular2-universal';

import { AppModule } from './app/app.module';
//platformUniversalDynamic().bootstrapModule(AppModule);
document.addEventListener('DOMContentLoaded', () => {
console.log('Boot')
  platformUniversalDynamic().bootstrapModule(AppModule);

});
