const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const production = process.env.NODE_ENV === "production";
const isAnalyze = process.env.ANALYZE === "true";
module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js"),
    price: path.resolve(__dirname, "src/js/priceStepFinal.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  cache: false,
  watch: production ? false : true,
  mode: production ? "production" : "development",
  devtool: production ? "hidden-source-map" : "eval",

  devServer: {
    host: "localhost",
    port: 3001,
    hotOnly: true,
    hot: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.filename$/,
        use: ["loader-b", "loader-a"],
      },
      // {
      //   test: /\.(sc|c|sa)ss$/,
      //   use: [
      //     { loader: "style-loader" },
      //     // { loader: MiniCssExtractPlugin.loader },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|pdf|jpg|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         [
      //           "@babel/preset-env",
      //           {
      //             useBuiltIns: "usage",
      //             corejs: 3,
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({}),
    // new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      favicon: path.resolve(__dirname, "src/images/imyourbox.ico"),
      chunks: "index",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "price.html",
      template: path.resolve(__dirname, "src", "price.html"),
      chunks: "price",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "service.html",
      template: path.resolve(__dirname, "src", "service.html"),
      chunks: "service",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "introduction.html",
      template: path.resolve(__dirname, "src", "introduction.html"),
      chunks: "introduction",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "access.html",
      template: path.resolve(__dirname, "src", "access.html"),
      chunks: "access",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "employment.html",
      template: path.resolve(__dirname, "src", "employment.html"),
      chunks: "employment",
      minify: false,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: isAnalyze ? true : false,
    }),
    {
      apply: (compiler) => {
        production &&
          compiler.hooks.done.tap("DonePlugin", (stats) => {
            console.log("Compile is done !");
            setTimeout(() => {
              process.exit(0);
            });
          });
      },
    },
  ],

  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: production ? true : false,
          },
        },
      }),
    ],
  },
};
