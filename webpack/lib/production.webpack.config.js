var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, '../..'),

  entry: {
    'react-reflex.min': [
      './src/lib/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/umd'),
    library: 'react-reflex',
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  plugins: [

    new clean(['dist/umd'], {
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

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'es'
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
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

