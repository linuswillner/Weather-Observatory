const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

// Determine if development or not
const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1

// HTML plugin
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

// Plugin config
const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})

// UglifyJS
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
})

// Webpack config
module.exports = {
  // Development server
  devServer: {
    host: 'localhost',
    port: '8000',
    noInfo: true,
    quiet: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  // Entry point
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '/src/index.jsx')
  ],
  // Node
  node: {
    fs: 'empty'
  },
  // Loaders
  module: {
    loaders: [
      { // JSX
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      { // CSS
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { // Images
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  // Extension config
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Production build
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build')
  },
  // If in dev, use hot reload and named modules - otherwise generate production code
  plugins: dev ? [ HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin() ] : [ HTMLWebpackPluginConfig, DefinePluginConfig, UglifyJsPluginConfig ]
}
