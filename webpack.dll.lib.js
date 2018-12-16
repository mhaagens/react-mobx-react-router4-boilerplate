/* webpack --config  webpack.dll.config.js --progress */

const path = require('path');
const webpack = require('webpack');

const isDebug = process.env.NODE_ENV === 'development';
const publicPath = './public/lib';

const outputPath = isDebug ? path.join(__dirname, `${publicPath}/debug`) : path.join(__dirname, `${publicPath}/min`);

const lib = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'history',
  'mobx',
  'mobx-react',
  'mobx-react-router',
  'axios',
  'classnames'
];

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname
  })
];

module.exports = {
  devtool: '#source-map',
  entry: {
    lib: lib
  },
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
      }
    ]
  },
  mode: isDebug ? 'development' : 'production',
  output: {
    path: outputPath,
    filename: isDebug ? '[name].js' : '[name].[hash:9].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]'
  },
  plugins: plugin
};
