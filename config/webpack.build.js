const webpack= require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.base.js');

const config= {
  mode: 'production',
  optimization: {
		minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            ie8: true,
          },
          ecma: 5,
          mangle: true,
          output: {
            comments: false,
          }
        },
        sourceMap: false
      }),
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ]
}

module.exports= webpackMerge(baseConfig, config)