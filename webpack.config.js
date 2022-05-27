const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    filename: "[fullhash].js",
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
    // new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[ext]',
        },
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
