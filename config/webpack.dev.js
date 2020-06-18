const webpack= require('webpack')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base.js');

const devConfig= {
  mode: 'development',
  devtool: 'inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // contentBase: '/dist/',     // 开启的服务的pathname(设置静态资源的根目录，html-webpack-plugin生成的 html 不是静态资源。当用 html 文件里的地址无法找到静态资源文件时就会去这个目录下去找)
    // hot: true,              // 开启模块热替换
    inline: true,           // 开启实时刷新
    publicPath: '/',      // 指定浏览器上访问所有 打包(bundled)文件 (在h5里生成的所有文件) 的根目录，这个根目录是相对服务器地址及端口的，比devServer.contentBase和output.publicPath优先。
    port: process.argv.port || 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    // proxy: {
    //   '/api/': {
    //     target: '',
    //     changeOrigin: true
    //   }
    // }
  }
}

module.exports= webpackMerge(baseConfig, devConfig)