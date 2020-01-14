const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/templates/public/src/index.jsx',
    resolve: {
      extensions: [ '.js', '.jsx' ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader' // will use .babelrc
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname+"/src/templates/public", 'dist'),
    },
    node: {
      fs: "empty"
    }
  }
  