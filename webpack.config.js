var www = require('./config/webpack.www');
var server = require('./config/webpack.server');
var electron = require('./config/webpack.electron');
module.exports = [www, server, electron]
