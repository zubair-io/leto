// // the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills';

// import * as path from 'path';
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as compression from 'compression'

// let cookieParser = require('cookie-parser');
// let horizon = require('@horizon/server');

// // Angular 2
// import { enableProdMode } from '@angular/core';
// // Angular 2 Universal
// import { expressEngine } from 'angular2-universal';

// // enable prod for faster renders
// enableProdMode();

// const app = express();
// const ROOT = path.join(path.resolve(__dirname, '..'));

// // Express View
// app.engine('.html', expressEngine);
// app.set('views', path.join(__dirname, '../dist/www'));
// app.set('view engine', 'html');

// app.use(cookieParser('Angular 2 Universal'));
// app.use(bodyParser.json());
// app.use(compression())

// // Serve static files
// //app.use('/assets', express.static(path.join(__dirname, '../assets'), {maxAge: 30}));
// app.use(express.static(path.join(__dirname, '../dist/www'), { index: false }));


// import { ngApp } from './main.node';
// // Routes with html5pushstate
// // ensure routes match client-side-app
// app.get('/', ngApp);
// app.get('/about', ngApp);
// app.get('/about/*', ngApp);
// app.get('/home', ngApp);
// app.get('/home/*', ngApp);

// // use indexFile over ngApp only when there is too much load on the server
// function indexFile(req, res) {
//   // when there is too much load on the server just send
//   // the index.html without prerendering for client-only
//   res.sendFile('/index.html', { root: path.join(__dirname, '../dist/www') });
// }

// app.get('*', function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   var pojo = { status: 404, message: 'No Content' };
//   var json = JSON.stringify(pojo, null, 2);
//   res.status(404).send(json);
// });

// // Server
// let http_server = app.listen(8181, () => {
//   console.log('Listening on: http://localhost:8181');
// });

// let options = {
//   project_name: 'leto',
//   permissions: false,
//   auto_create_collection: true,
//   auto_create_index: true,
//     auth: {
//     token_secret: '123',
//     allow_anonymous: true,
//   }
// };

// horizon(http_server, options);
