var path = require('path')

module.exports = {

  context: path.join(__dirname, '../..'),

  devtool: 'source-map',

  mode: 'development',

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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react', '@babel/env'],
              plugins: [
                "react-hot-loader/babel",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                '@babel/transform-runtime'
              ]
            }
        }]
      },
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

