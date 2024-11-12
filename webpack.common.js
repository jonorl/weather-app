const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  entry: {
    app: "./src/js/index.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      title: "development",
    }),
  ],

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};