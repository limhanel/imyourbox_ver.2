const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const production = process.env.NODE_ENV === "production";
const isAnalyze = process.env.ANALYZE === "true";
module.exports = {
    entry: { index: path.resolve(__dirname, "src/js/index.js") },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
    },
    cache: false,
    watch: production ? false : true,
    mode: production ? "production" : "development",
    devtool: production ? "hidden-source-map" : "eval",
    devServer: {
        publicPath: "",
        contentBase: path.resolve(__dirname, ""),
        watchContentBase: true,
        host: "127.0.0.1",
        port: 8080,
    },
    target: "web",
    module: {
        rules: [{
                test: /\.filename$/,
                use: ["loader-b", "loader-a"],
            },
            {
                test: /\.(sc|c|sa)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|pdf|jpg|svg)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "usage",
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({}),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new HtmlWebpackPlugin({
            filename: "price.html",
            template: path.resolve(__dirname, "src", "price.html"),
        }),
        new HtmlWebpackPlugin({
            filename: "service.html",
            template: path.resolve(__dirname, "src", "service.html"),
        }),
        new HtmlWebpackPlugin({
            filename: "introduction.html",
            template: path.resolve(__dirname, "src", "introduction.html"),
        }),
        new HtmlWebpackPlugin({
            filename: "access.html",
            template: path.resolve(__dirname, "src", "access.html"),
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: "header.html",
            template: path.resolve(__dirname, "src", "header.html"),
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: "footer.html",
            template: path.resolve(__dirname, "src", "footer.html"),
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