const webpack= require('webpack')
const path= require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const isDev= process.env.NODE_ENV === 'development'

module.exports= {
  mode: isDev ? 'development' : 'production',
  target: 'electron-main',
  entry: {
    "index.prod": path.resolve(__dirname, "./../main/index.js")
  },
  output: {
		path: path.resolve(__dirname, "./../main/"),    // 打包好的文件输出的路径
		filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: [
		
		new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new FriendlyErrorsWebpackPlugin(),

  ],
  stats: "errors-only",
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
  
}