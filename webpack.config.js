const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  module: {
    rules: [
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"] },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
};

const backgroundConfig = Object.assign({}, commonConfig, {
  name: "background",
  entry: "./src/background.ts",
  output: {
    path: __dirname + "/dist",
    filename: "background.js"
  }
});

const popUpConfig = Object.assign({}, commonConfig, {
  name: "popUp",
  entry: "./src/popUp/index.tsx",
  output: {
    path: __dirname + "/dist/popUp",
    filename: "index.js"
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/popUp/index.html",
    title: "Focus"
  })]
});

module.exports = [
  backgroundConfig,
  popUpConfig
];