const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundlePlugin = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const webpackConfig = require('./webpack.config');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const publicPath = '/';

const mergeConfig = merge(webpackConfig, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'output'),
    publicPath: publicPath,
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
        NODE_ENV: JSON.stringify('production'),
        __DEV__: process.env.NODE_ENV === 'production'
      }
    }),

    new webpack.NamedModulesPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'
    }),

    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: 'index.html'
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/lib/min/manifest.json')
    }),

    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/lib/min/lib.aef84325a.js'),
        outputPath: 'lib/min',
        publicPath: `${publicPath}lib/min`,
        includeSourcemap: false
      }
    ]),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/),

    new BundlePlugin.BundleAnalyzerPlugin(),

    new PrerenderSPAPlugin({
      // Index.html is in the root directory.
      staticDir: path.join(__dirname, 'output'),
      outputDir: path.join(__dirname, 'output'),
      indexPath: path.join(__dirname, 'output', 'index.html'),
      routes: ['/'],
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },

      server: {
        // Normally a free port is autodetected, but feel free to set this if needed.
        port: 8001,
        proxy: {
          '/dist/': {
            target: 'http://127.0.0.1:8001',
            pathRewrite: { '^/dist': '/' }
          }
        }
      },

      postProcess(context) {
        // Remove /index.html from the output path if the dir name ends with a .html file extension.
        // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
        // context.html = context.html.replace(/\/dist/gi, '');
        return context;
      },

      renderer: new Renderer({
        renderAfterTime: 2000
      })
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
