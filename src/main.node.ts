// the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills'; // polyfills are moved to server.ts


// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Application
import {AppComponent} from './app/app.component'
import {routes} from './app/app.routes';

let  templateCache = new Map();
export function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let cache = templateCache.get(url)
  if(cache){
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).send(cache);
    return;
        }
  let config: ExpressEngineConfig = {
    directives: [
      AppComponent
    ],
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: APP_BASE_HREF, useValue: baseUrl},
    ],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  };

      res.render('index', config, (err, html) => {
            templateCache.set(url, html);
            res.status(200).send(html);
    });
}
