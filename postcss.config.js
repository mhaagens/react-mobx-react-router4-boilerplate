module.exports = {
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: false
    }),

    require('css-declaration-sorter')({
      order: 'concentric-css'
    }),

    require('cssnano')({
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }),

    require('autoprefixer')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      remove: true
    }),

    require('css-mqpacker')()
  ]
};
