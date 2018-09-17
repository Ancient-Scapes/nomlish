var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  externals: [nodeExternals()],
  target: 'node',
 
  entry: './src/main.js',
 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};
