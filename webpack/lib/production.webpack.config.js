var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, '../..'),

  entry: {
    'index.min': [
      'babel-polyfill',
      './src/lib/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/lib'),
    library: 'react-reflex',
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  plugins: [

    new clean(['dist/lib'], {
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
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    "react-dom": {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }
}

