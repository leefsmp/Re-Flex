var path = require('path')

module.exports = {

  devtool: 'source-map',

  context: path.join(__dirname, '../..'),

  entry: {
    'react-reflex': [
      './src/lib/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/umd'),
    library: 'react-reflex',
    filename: '[name].js',
    libraryTarget: 'umd'
  },

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

