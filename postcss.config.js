module.exports = {
  plugins: [
    require('postcss-preset-env')({}),
    require('css-declaration-sorter')({
      order: 'concentric-css'
    }),
    require('cssnano')({
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }),
    require('css-mqpacker')()
  ]
};
