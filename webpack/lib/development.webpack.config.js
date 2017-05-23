var path = require('path')

module.exports = {

  devtool: 'source-map',

  context: path.join(__dirname, '../..'),

  entry: {
    'index': [
      './dist/es/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/lib'),
    library: 'react-reflex',
    filename: '[name].js',
    libraryTarget: 'umd'
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

