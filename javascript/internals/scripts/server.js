var ip = require("ip");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

console.log('Starting server...\n');

new WebpackDevServer(webpack({output: {path:'/'}}), { // Start a server
    publicPath: 'dist',
    filename: "app.js",
    contentBase: 'dist',
    lazy: true,
    historyApiFallback: true,
    quiet: true // Without logging
}).listen(8080, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server started');
        console.log(`Listening at ${ip.address()}:8080`);
    }
});


