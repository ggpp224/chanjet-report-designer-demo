/**
 * Created by guopeng on 16/9/12.
 */
const path = require('path');
const fs = require('fs');
const basePath = process.cwd();
const buildPath = path.resolve(basePath, 'src/www');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * prod只添加最基础的模块
 * @type {string[]}
 */
var vendors = [
    'react',
    'react-dom',
    'core-decorators/lib/autobind'
];
if(process.env.NODE_ENV === 'development'){
    // 开发模式配置， 提高hot update 速度
    vendors = vendors.concat([
        'babel-es6-polyfill/browser-polyfill.min.js',
    ]);
}

module.exports = {
  entry: {
      'lib': vendors
  },

  output: {
      path: buildPath,
      filename: '[name].js',
      library: '[name]',
  },

  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
          output  : {
              comments: false,
          },
      }),
      new ExtractTextPlugin('[name].css', {allChunks: true}),
      new webpack.DllPlugin({
          path: 'manifest.json',
          name: '[name]',
          context: basePath
      })
  ],
    module: {
        loaders: [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                include: /src/,
            },
            {
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?'+JSON.stringify({autoprefixer:{remove:false}})+'!less-loader', {publicPath: ''})
            },
        ]
    }

};
