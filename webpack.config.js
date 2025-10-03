const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => ({
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: "3000",
        static: {
            directory: path.join(__dirname, "public"),
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\-sw\.(c|m)?js$/i,
                loader: "worker-loader",
            },
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            favicon: path.join(__dirname, "src", "favicon.ico")
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/.htaccess', to: '' },
                { from: './public/firebase-messaging-sw.js', to: 'firebase-messaging-sw.js' },
            ]
        }),
        new Dotenv({
            path: `./.env${env.file && env.file !== '' && env.file !== null ? `.${env.file}` : ''}`
        }),
    ],
})