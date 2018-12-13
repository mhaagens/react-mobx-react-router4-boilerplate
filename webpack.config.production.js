const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfig = require('./webpack.config');

const mergeConfig = merge(webpackConfig, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:12].js',
    chunkFilename: 'js/[id].[chunkhash:12].js'
  },

  devtool: '#source-map',

  module: {},

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          mangle: {
            toplevel: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          autoprefixer: false,
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.NamedModulesPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'
    }),

    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html'
    })
  ]
});

mergeConfig.module.rules
  .filter((rule) => {
    const bool =
      rule.use &&
      Array.isArray(rule.use) &&
      rule.use.find((name) => {
        if (Object.prototype.toString.call(name) === '[object Object]') {
          name = name.loader;
        }
        return /css-loader/.test(name.split('?')[0]);
      });
    return bool;
  })
  .forEach((rule) => {
    rule.use[0] = MiniCssExtractPlugin.loader;
  });

module.exports = mergeConfig;
