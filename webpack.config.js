module.exports = {
  // ... rest of config
  resolve: {
    fallback: {
      // path: require.resolve("path-browserify"),
      // util: require.resolve("util/"),
      // buffer: require.resolve("buffer/"),
      // process: require.resolve("process/browser"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{ loader: "html-loader" }],
      },
    ],
  },
};
