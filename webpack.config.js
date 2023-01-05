const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log(mode + 'mode');

module.exports = {
  mode: mode,
  output: {
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
    template: "./src/index.html"
  })],
  module: {
    rules:[
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
        (mode === 'development') ? "style-loader" : 
        MiniCssExtractPlugin.loader, "css-loader",
        {loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    //Options
                  },
                ],
              ],
            },
          },
        },
        "sass-loader",
      ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
}