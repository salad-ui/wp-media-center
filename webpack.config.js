const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

console.log({
  '@salad-ui/typography': `${__dirname}/../components/packages/typography/src/index.tsx`,
});

module.exports = {
  entry: {
    chooser: './app/chooser/index.tsx',
    manager: './app/manager/index.tsx',
  },
  output: {
    path: `${__dirname}/plugin/static`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@salad-ui/typography': path.resolve(
        `${__dirname}/../components/packages/typography/src`,
      ),
    },
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
      filename: './chooser/index.html',
      excludeChunks: ['manager'],
    }),
    new HtmlWebpackPlugin({
      template: './app/manager/index.html',
      filename: './manager/index.html',
      excludeChunks: ['chooser'],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
