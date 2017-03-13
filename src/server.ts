const fs = require('fs');
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
require('dotenv').config()

let horizon = require('@horizon/server');

// Angular 2
import { enableProdMode } from '@angular/core';
import { AppNodeModuleNgFactory } from './aot/src/app/app.node.module.ngfactory'
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from './express-engine';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname));
let pageCache = new Map();
// Express View
app.engine('.html', ngExpressEngine({ aot:true, bootstrap: AppNodeModuleNgFactory }));

app.set('views', path.join(ROOT, '../dist/www/'));
app.set('view engine', 'html');

app.use('/assets', express.static(path.join(ROOT, 'assets'), { maxAge: 30 }));

app.use(express.static(path.join(ROOT, '../dist/www/'), { index: false }));

app.get('/', (req, res) => {
   // res.render('index', { req });
    let url = req.originalUrl || '/';

    let html = pageCache.get(url);
    if (html !== undefined) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.status(200).send(html);
      return;
    }

    res.render('index', {
      req,
      res,
    }, (err, html) => {
      console.log(err)
      pageCache.set(url, html);
      res.status(200).send(html);
    })
});


app.get('/ping', (req, res) => {
    res.status(200).send('ok');
});


let port = process.env.SSL_PORT || 84443

// Server
let http_server = app.listen(8181, () => {
    console.log(`Listening on: http://localhost:${port}`);
});

let options = {
    project_name: 'leto',
    permissions: false,
    auto_create_collection: true,
    auto_create_index: true,
    auth: {
        token_secret: process.env.token || 'ayUAuX6S36CuOH240',
        allow_anonymous: true,
    }
};


var https = require('https');
var privateKey = fs.readFileSync('host.key', 'utf8');
var certificate = fs.readFileSync('host.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpsServer = https.createServer(credentials, app);
let sslPort = process.env.SSL_PORT || 8443
httpsServer.listen(sslPort, () => {
    console.log(`Listening on: http://localhost:${sslPort}`);

});

const horizonServer = horizon([http_server, httpsServer], options);
if (process.env.AUTH0_id && process.env.AUTH0_secret && process.env.AUTH0_host) {
    horizonServer.add_auth_provider(
        horizon.auth.auth0,
        { id: process.env.AUTH0_id, secret: process.env.AUTH0_secret, path: 'auth0', host: process.env.AUTH0_host }
    );
}
