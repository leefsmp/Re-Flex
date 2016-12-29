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

    //new webpack.NoErrorsPlugin(),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //
    //new webpack.optimize.MinChunkSizePlugin({
    //  minChunkSize: 51200
    //})
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {

    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['react', 'es2015', 'stage-0'] // { "modules": false }
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [ "style-loader", "css-loader", "sass-loader"]
      }
    ],

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
