const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const RegExpAliasResolverPlugin = require('./webpack-regexp-alias-resolver-plugin');

module.exports = {
  entry: {
    chooser: './app/chooser/index.tsx',
    manager: './app/manager/index.tsx',
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
    plugins: [
      new RegExpAliasResolverPlugin(
        /^@salad-ui\/(.+)/,
        path.resolve(`${__dirname}/../components/packages/$1/src`),
      ),
    ],
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
      template: './app/chooser/index.html',
      filename: './chooser.html',
      excludeChunks: ['manager'],
    }),
    new HtmlWebpackPlugin({
      template: './app/manager/index.html',
      filename: './manager.html',
      excludeChunks: ['chooser'],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
