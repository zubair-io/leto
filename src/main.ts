import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component'
import {HTTP_PROVIDERS} from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS]);

