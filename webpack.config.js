const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: 'development',
  devServer: {
    watchFiles: ["./src/*"],
    static: "./dist/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "App",
      filename: "index.html",
      template: "src/index.html",
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
      },
      {test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    ],
  },
};
