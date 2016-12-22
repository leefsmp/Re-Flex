var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  devtool: 'source-map',

  context: path.join(__dirname, '../..'),

  entry: {
    bundle: [
      'babel-polyfill',
      './src/demo/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/demo'),
    filename: "[name].js"
  },

  plugins: [

    new clean(['dist/demo'], {
      root: __dirname + '/..',
      verbose: true,
      dry: false
    }),

    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    }),

    //new webpack.optimize.UglifyJsPlugin({
    //  output: {
    //    comments: false
    //  },
    //  compress: {
    //    warnings: false
    //  },
    //  minimize: true,
    //  mangle: true
    //}),

    //new webpack.DefinePlugin({
    //  'process.env.NODE_ENV': '"production"'
    //})
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  }
}
