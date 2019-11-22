const webpack = require('webpack');
const path = require('path');
const fs = require('fs'); // to check if the file exists
const htmlPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  const envPath = path.resolve(__dirname, '.env.development');
  const env = dotenv.config({ path: envPath }).parsed;
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    target: 'web',
    devtool: 'cheap-module-source-map',
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      stats: 'minimal',
      overlay: true,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      https: false
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new htmlPlugin({
        template: './src/index.html',
        favicon: './src/favicon.ico'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /(\.sass)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /(\.css)$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
