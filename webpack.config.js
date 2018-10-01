var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  externals: [nodeExternals()],
  target: 'node',
  devtool: 'inline-source-map',
  entry: './src/main.js',
  output: {
    library: 'nomlish',
    libraryTarget: 'umd'
  },
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
