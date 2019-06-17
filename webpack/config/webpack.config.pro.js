const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const ora = require('ora');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const shell = require('shelljs');

const spinner = ora({
  spinner: {
    frames: ['←', '↑', '→', '↓'],
    interval: 80,
  },
  color: 'red',
  text: 'Loading...',
});

const entry = path.resolve(__dirname, '../../', 'src', 'main.js');
const inlineConfig = merge(baseConfig, {
  entry: function setEntry() {
    return entry; // 入口文件
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            modules: true, // 指定使用CSS modules
            localIdentName: '[local]' // 指定css的类名格式
          }
        },
        {
          loader: "postcss-loader",
          options: { // 如果没有options这个选项将会报错 No PostCSS Config found
            config: {
              path: './'
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../', 'public', 'index.html'), // template
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      filename: 'index.html'
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Your application build successed\n'],
      },
    })
  ],
  performance: {
    hints: "warning",
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  }
});
spinner.start();
shell.exec('rd /s /q dist');
webpack(inlineConfig, (err, stats) => {
  spinner.stop();
  if (err) {
    console.log(err);
  }
  console.log('build successed');
});