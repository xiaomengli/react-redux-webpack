/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AliyunossWebpackPlugin = require('aliyunoss-webpack-plugin2')
const CopyWebpackPlugin = require('copy-webpack-plugin')

switch(process.env.NODE_ENV) {
  case 'production':
    var CONTEXT = 'your_production_project'
    var API_SERVER = 'http://your_production_server/'
    break

  case 'test':
    var CONTEXT = 'your_test_project'
    var API_SERVER = 'http://your_test_server/'
    break
}

const PUBLIC_PATH = 'http://your_static_file_server/' + CONTEXT + '/'

const buildHtmlWebpackPlugin = function() {
  const pages = ['index']
  return pages.map((item, index) => (
    new HtmlWebpackPlugin({
        filename: 'pages/' + item + '.html',
        template: 'src/templates/' + item + '.html',
        inject: 'body',
        chunks: item,
        minify: {
          html5: false,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        }
      })
  ))
}

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    filename: '[hash].bundle.js',
    path: __dirname + '/dist/',
    chunkFilename: '[hash].bundle.js',
    publicPath: PUBLIC_PATH
  },
  plugins: [
    new webpack.DefinePlugin({  
        __DEBUG__: false,
        __API_SERVER__: "'" + API_SERVER + "'"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/',
        to: 'images/'
      }
    ]),
    new AliyunossWebpackPlugin({
      buildPath:'dist',
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      getObjectHeaders: function(filename) {
        return {
          Expires: 6000
        }
      },
      generateObjectPath: function(fileName, file) {
        var tempList = file.split('/')
        tempList[0] = CONTEXT;

        return tempList.join('/')
      }
    })
  ].concat(buildHtmlWebpackPlugin()),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&' + 
        'includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader?limit=8192'
      }
    ]
  }
}

