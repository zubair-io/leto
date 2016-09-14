// the polyfills must be the first thing imported in node.js
import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

let horizon = require('@horizon/server');

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
let  pageCache = new Map();
// Express View
import { main } from './main.node';
app.engine('.html', createEngine({ main }));
app.set('views', path.join(ROOT, '../dist/www'));
app.set('view engine', 'html');
app.set('view cache', true);
//app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// Serve static files
//app.use('/assets', express.static(path.join(__dirname, '../assets'), {maxAge: 30}));
console.log(
  path.join(ROOT, '../dist/www')
)
app.use(express.static(path.join(ROOT, '../dist/www'), { index: false }));

app.get('/', (req, res) => {
      let url = req.originalUrl || '/';

       let html = pageCache.get( url );
        if ( html !== undefined ){
            res.setHeader('Cache-Control', 'public, max-age=300');
            res.status(200).send(html);
            return;
        }

  
  res.render('index', {req, res}, (err, html)=>{
    pageCache.set(url, html);
    res.status(200).send(html);
  })

});

app.get('*', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let http_server = app.listen(8181, () => {
  console.log('Listening on: http://localhost:8181');
});

let options = {
  project_name: 'leto',
  permissions: false,
  auto_create_collection: true,
  auto_create_index: true,
    auth: {
    token_secret: '123',
    allow_anonymous: true,
  }
};

horizon(http_server, options);
