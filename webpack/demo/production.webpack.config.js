var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, '../..'),

  entry: {
    bundle: [
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

    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  stats: {
    warnings: false
  },

  module: {

    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-runtime']
          }
        }]
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use: [ "style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}
