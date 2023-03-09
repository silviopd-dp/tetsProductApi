const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "buffer": false,
            "url": false,
            "util": false,
            "assert": false,
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": false,
            "pg-native": false,
            "dns": false,
            "querystring": false,
            "async_hooks": false,
            // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        } 
        },
    
    entry: './index.js',
    output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
    },
    module: {
    rules: [
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env'],
            },
        },
        },
    ],
    },  
    performance : {
        hints : false
    }  
};
