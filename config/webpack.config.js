const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config')
const fs = require('fs');

let webpackCustomConfig;

if(fs.existsSync('./webpack.custom.config.js')) {
    webpackCustomConfig = require('./webpack.custom.config.js')
}
else{
    webpackCustomConfig = {}
}

module.exports = merge(webpackBaseConfig, webpackCustomConfig);