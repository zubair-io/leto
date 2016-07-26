'use strict'
let path = require('path')
let p = path.join( __dirname, '../www')
let serve = require('koa-static');
let koa = require('koa');

let horizon = require('@horizon/server');
let server = koa();
server.use(serve(p));

let http_server = server.listen(8181);
let options = {
    project_name: 'leto',
    permissions: false,
    auth: {
        token_secret: '123',
        allow_anonymous: true,
    }
};

horizon(http_server, options);
