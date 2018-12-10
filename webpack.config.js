const path = require("path");
const cssnano = require('cssnano');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDebug = process.env.NODE_ENV === 'development';
const BASE_CSS_LOADER = 'css-loader?importLoaders=1&sourceMap';

const POSTCSS = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: false,
      browsers: [
        "last 2 versions",
        "safari >= 7"
      ]
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
];


module.exports = {
  mode: isDebug ? 'development' : 'production',
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router",
      'history',
      "mobx",
      "mobx-react",
      "mobx-react-router"
    ],
    app: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://0.0.0.0:3000",
      "webpack/hot/only-dev-server",
      "./src/index"
    ]
  },
  resolve : {
    extensions: ['.js', '.jsx', '.json', '.web.js'],
    alias: {
      components: path.resolve('./src', 'components'),
      constants: path.resolve('./src', './constants'),
      api: path.resolve('./src', './api'),
      routes: path.resolve('./src', './routes'),
      utils: path.resolve('./src', './utils')
    }
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    port: 3000,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
  devtool: "#source-map",
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
              importLoaders: 1,
              sourceMap: true,
              import: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return POSTCSS;
              },
              sourceMap: true
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
          BASE_CSS_LOADER,
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return POSTCSS;
              },
              sourceMap: true
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
        // exclude : null,
        use: [
          'style-loader',
          BASE_CSS_LOADER,
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return POSTCSS;
              },
              sourceMap: true
            }
          }
        ]
      },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
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
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./src/index.html"
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/)
  ]
};
