var clean = require('clean-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  
  context: path.join(__dirname, '../..'),
  mode: 'production',
  devtool: 'none',
  
  entry: {
    bundle: [
      './src/demo/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../../dist/demo'),
    filename: "[name].js"
  },

  optimization: {
    minimize: true
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
            presets: [
              '@babel/react', 
              ["@babel/env", {
                "targets": {
                  "browsers": [
                    "last 2 versions", 
                    "ie >= 11"
                  ]
                }
              }],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/transform-runtime'
            ]
          }
        }]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader:'style-loader'
        },  {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }
        }, {
          loader:'sass-loader'
        }]
      }
    ]
  }
}
