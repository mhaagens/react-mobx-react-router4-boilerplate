module.exports = {
  plugins: [
    require("postcss-cssnext")(),
    require("css-declaration-sorter")({
      order: "concentric-css"
    }),
    require("css-mqpacker")(),
    require("cssnano")({
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
  ]
};
