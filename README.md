# Webpack4升级完全指南

> webpack4官方已经于近日升级到了V4.5的稳定版本，对应的一些必备插件(webpack-contrib)也陆续完成了更新支持，笔者在第一时间完成了项目由V3到V4的迁移，在此记录一下升级过程中遇到的种种问题和对应的解决手段，方便后续入坑者及时查阅，减少重复工作。

## 一、Node版本依赖重新调整

官方不再支持node4以下的版本，依赖node的环境版本>=6.11.5，当然考虑到最佳的es6特性实现，建议node版本可以升级到V8.9.4或以上版本，具体更新说明部分可以见：[webpack4更新日志](https://github.com/webpack/webpack/releases/tag/v4.0.0)

```javascript
"engines": {
    "node": ">=6.11.5" // >=8.9.4 (recommendation version) 
  }
```


## 二、用更加快捷的mode模式来优化配置文件

webpack4中提供的mode有两个值：development和production，默认值是 production。mode是我们为减小生产环境构建体积以及节约开发环境的构建时间提供的一种优化方案，提供对应的构建参数项的默认开启或关闭，降低配置成本。

### 开启方式 1：直接在启动命令后加入参数

```javascript
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

### 开启方式 2：可以在配置文件中加入一个mode属性：

```javascript
module.exports = {
  mode: 'production' // development
};
```

### development模式下，将侧重于功能调试和优化开发体验，包含如下内容：
> 1. 浏览器调试工具
> 2. 注释、开发阶段的详细错误日志和提示
> 3. 快速和优化的增量构建机制

### production模式下，将侧重于模块体积优化和线上部署，包含如下内容：
> 1. 开启所有的优化代码
> 2. 更小的bundle大小
> 3. 去除掉只在开发阶段运行的代码
> 4. Scope hoisting和Tree-shaking
> 5. 自动启用uglifyjs对代码进行压缩

webpack一直以来最饱受诟病的就是其配置门槛极高，配置内容复杂而繁琐，容易让人从入门到放弃，而它的后起之秀如rollup，parcel等均在配置流程上做了极大的优化，做到开箱即用，webpack在V4中应该也从中借鉴了不少经验来提升自身的配置效率，详见内容可以参考这篇文章[《webpack 4: mode and optimization》](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)


## 三、再见commonchunk，你好optimization

从webpack4开始官方移除了commonchunk插件，改用了optimization属性进行更加灵活的配置，这也应该是从V3升级到V4的代码修改过程中最为复杂的一部分，下面的代码即是optimize.splitChunks 中的一些配置参考，

```javascript
module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: true, // [new UglifyJsPlugin({...})]
    splitChunks:{
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
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
}
```

### 从中我们不难发现，其主要变化有如下几个方面：

> 1. commonchunk配置项被彻底去掉，之前需要通过配置两次new webpack.optimize.CommonsChunkPlugin来分别获取vendor和manifest的通用chunk方式已经做了整合，** 直接在optimization中配置runtimeChunk和splitChunks即可 ** ，提取功能也更为强大，具体配置见：[splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks)

>1. runtimeChunk可以配置成true，single或者对象，用自动计算当前构建的一些基础chunk信息，类似之前版本中的manifest信息获取方式。

>1. webpack.optimize.UglifyJsPlugin现在也不需要了，只需要使用optimization.minimize为true就行，production mode下面自动为true，当然如果想使用第三方的压缩插件也可以在optimization.minimizer的数组列表中进行配置

## 四、ExtractTextWebpackPlugin调整，建议选用新的CSS文件提取插件mini-css-extract-plugin

由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)也完成了其历史使命，将让位于[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

### 基本配置如下：

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
          "css-loader"
        ]
      }
    ]
  }
}
```

### 生产环境下的配置优化：

```javascript
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
    })
  ]
  ....
}

```

### 将多个css chunk合并成一个css文件

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {			
          name: 'styles',
          test: /\.scss|css$/,
          chunks: 'all',	// merge all the css chunk to one file
          enforce: true
        }
      }
    }
  }
}
```


## 五、其他调整项备忘

> 1. NoEmitOnErrorsPlugin- > optimization.noEmitOnErrors（默认情况下处于生产模式） 
> 2. ModuleConcatenationPlugin- > optimization.concatenateModules（默认情况下处于生产模式） 
> 3. NamedModulesPlugin- > optimization.namedModules（在开发模式下默认开启） 
> 4. CommonsChunkPlugin 被删除 - > optimization.splitChunks
> 5. webpack命令优化 -> 发布了独立的 [webpack-cli](https://webpack.js.org/api/cli/) 命令行工具包
> 6. webpack-dev-server -> 建议升级到最新版本
> 7. html-webpack-plugin -> 建议升级到的最新版本
> 8. file-loader -> 建议升级到最新版本
> 9. url-loader -> 建议升级到最新版本

## 六、参考工程
[webpack4配置工程实例](https://github.com/taikongfeizhu/react-mobx-react-router4-boilerplate)

## 七、参阅资料

1. [webpack4](https://blog.csdn.net/qq_20334295/article/details/79401231)
2. [webpack4发布概览](https://zhuanlan.zhihu.com/p/34028750)
3. [webpack 4: mode and optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)
4. [webpack4新特性介绍](https://segmentfault.com/a/1190000013970017)
5. [webpack4升级指北](https://segmentfault.com/a/1190000013420383)
6. [webpack4升级指南以及从webpack3.x迁移](https://blog.csdn.net/qq_26733915/article/details/79446460)
