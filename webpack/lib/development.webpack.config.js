var webpack = require('webpack')
var path = require('path')

module.exports = {

  devtool: 'source-map',

  context: path.join(__dirname, '../..'),

  entry: {
    index: './src/lib/index.js'
  },

  output: {
    path: path.join(__dirname, '../../dist/lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 're-flex'
  },

  plugins: [

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

