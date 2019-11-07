const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    chooser: './app/chooser/index.tsx',
    manager: './app/manager/index.tsx'
  },
  output: {
    path: `${__dirname}/plugin/static`
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/chooser/index.html',
      filename: './chooser/index.html',
      excludeChunks: ['manager']
    }),
    new HtmlWebpackPlugin({
      template: './app/manager/index.html',
      filename: './manager/index.html',
      excludeChunks: ['chooser']
    }),
  ]
}
