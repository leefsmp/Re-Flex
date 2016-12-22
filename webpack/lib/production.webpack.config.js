var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, '../..'),

  entry: {
    'index.min': './src/lib/index.js'
  },

  output: {
    path: path.join(__dirname, '../../dist/lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 're-flex'
  },

  plugins: [

    new clean(['dist/lib'], {
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

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      minimize: true,
      mangle: true
    })
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

