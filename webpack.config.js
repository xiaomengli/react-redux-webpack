/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildHtmlWebpackPlugin = function() {
  const pages = ['index']
  return pages.map((item, index) => (
    new HtmlWebpackPlugin({
      filename: item + '.html',
      template: 'src/templates/' + item + '.html',
      inject: 'body',
      chunks: item
    })
  ))
}

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({  
        __DEBUG__: true,
        __API_SERVER__: '"http://your.api.server/"'
    })
  ].concat(buildHtmlWebpackPlugin()),
  devtool: "source-map",
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
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib') +
        '&includePaths[]=' + path.resolve(__dirname, './src/style/mixins')
      }, 
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader'// Run both loaders
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
  },
  devServer: {
    historyApiFallback: true
  }
}

