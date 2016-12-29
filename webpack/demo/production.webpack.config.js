var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

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

    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      minimize: true,
      mangle: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new webpack.NoErrorsPlugin()
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
    ]
  }
}
