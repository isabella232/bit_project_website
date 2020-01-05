const path = require('path')

module.exports = {
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      } ,
    mode: 'development',
    entry: './src/index.js',
    resolve: {
        extensions: [ '.js' ,'.jsx']
    },
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'sourcemap',
        module: {
        rules: [
            {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
            },
        ],
    },
    node: {
        fs: 'empty'
    }
  };