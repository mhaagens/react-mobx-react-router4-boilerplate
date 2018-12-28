const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const POSTCSS = require('./postcss.config');

const isDebug = process.env.NODE_ENV === 'development';

const baseConfig = {
  mode: 'development',
  entry: {
    vendor: ['classnames', 'immer'],
    app: isDebug
      ? [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://0.0.0.0:3000',
          'webpack/hot/only-dev-server',
          './src/index'
        ]
      : ['./src/index']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.web.js'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      utils: path.resolve(__dirname, 'src/utils'),
      static: path.resolve(__dirname, 'src/static'),
      routes: path.resolve(__dirname, 'src/routes'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants')
    }
  },
  devServer: {
    hot: true,
    contentBase: [path.resolve(__dirname, 'output'), path.resolve(__dirname, 'public')],
    port: 3000,
    host: '0.0.0.0',
    publicPath: '/',
    stats: {
      color: true
    },
    clientLogLevel: 'none',
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
    historyApiFallback: true,
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, 'output'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: true,
          cacheDirectory: true
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              minimize: false,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: POSTCSS.plugins,
              sourceMap: isDebug
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: POSTCSS.plugins,
              sourceMap: isDebug
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: POSTCSS.plugins,
              sourceMap: isDebug
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&limit=8192&name=assets/[name].[hash:8].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                quality: 65,
                progressive: true
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader??prefix=fonts/name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?prefix=fonts/&name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=font/opentype'
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
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
        NODE_ENV: JSON.stringify('development')
      },
      __DEV__: process.env.NODE_ENV === 'development'
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html'
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/lib/debug/manifest.json')
    }),

    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/lib/debug/lib.js'),
        outputPath: 'lib/debug',
        publicPath: '/lib/debug',
        includeSourcemap: true
      }
    ]),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/)
  ]
};

module.exports = baseConfig;
