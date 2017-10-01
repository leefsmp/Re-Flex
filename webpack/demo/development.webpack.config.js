var path = require('path')

module.exports = {

  devtool: 'source-map',

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

  plugins: [],

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
            presets: ['react', 'env', 'stage-0'],
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
