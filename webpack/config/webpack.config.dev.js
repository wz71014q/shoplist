const webpack = require('webpack');
const program = require('commander');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const opn = require('opn');
const net = require('net');
const chalk = require('chalk');

let port = 3000;

const app = express();

let entry;

function checkPort() {
  return new Promise((resolve, reject) => {
    (function addport() {
      const server = net.Server();
      server.listen(port, () => {
        server.close();
        resolve(port);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          port++;
          addport.call();
        } else {
          reject(new Error(err));
        }
      });
    })();
  });
}

program
  .command('project <project> [file]')
  .action((project, file) => {
    entry = path.resolve(__dirname, '../../', 'src', 'main.js');
    const inlineConfig = merge(baseConfig, {
      entry: function setEntry() {
        return [entry, 'webpack-hot-middleware/client?reload=true&noInfo=true']; // 入口文件
      },
      mode: 'development',
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              "style-loader",
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
              },
            ]
          }
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin({
          log: false
        }),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'../../', 'index.html')// template
        }),
      ],
    });
    const compiler = webpack(inlineConfig);
    const instance = webpackDevMiddleware(compiler, {
      logLevel: 'error',
      progress: true,
      logTime: true,
    });
    app.use(instance);
    app.use(webpackHotMiddleware(compiler, {
      noInfo: true,
      log: false,
      heartbeat: 2000,
    }));
    instance.waitUntilValid(() => {
      console.log('Your application is running: ' + chalk.green(`http://localhost:${port}\n`))
    })
    checkPort()
      .then((res) => {
        app.listen(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });

program.parse(process.argv);
