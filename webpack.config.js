const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    chooser: './frontend/chooser/index.tsx',
    manager: './frontend/manager/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, `plugin/static`),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'styled-components': require.resolve('styled-components'),
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/chooser/index.html',
      filename: './chooser.html',
      excludeChunks: ['manager'],
    }),
    new HtmlWebpackPlugin({
      template: './frontend/manager/index.html',
      filename: './manager.html',
      excludeChunks: ['chooser'],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    port: '9000',
  },
};
