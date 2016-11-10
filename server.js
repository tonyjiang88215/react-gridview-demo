var ip = require("ip");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack/webpack-dev-config');

console.log('Starting server...\n');

new WebpackDevServer(webpack(config), {
}).listen(8080, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server started');
        console.log(`Listening at ${ip.address()}:8080`);
    }
});


