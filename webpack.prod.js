var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  externals: [nodeExternals()],
  target: 'node',
  entry: './src/main.js',
  optimization: {
    minimize: true,
  },
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
