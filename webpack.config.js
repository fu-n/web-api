const webpack = require('webpack')
const path = require('path')
module.exports = {

  entry: './public/src/main.js',
  output: {
    filename: './public/build/bundle.js'
  },
  watch:true,
  resolve: {
    alias: {
      vue: './vue.js'
    },
    extensions: ['*', '.js', '.vue', '.json'],
    modules: [ 
      'node_modules' 
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    // port: 3000
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery", // Used for Bootstrap JavaScript components
      jQuery: "jquery", // Used for Bootstrap JavaScript components
      Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
    }),
  ]
}