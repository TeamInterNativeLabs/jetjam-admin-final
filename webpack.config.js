const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

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
        // Use DefinePlugin so Vercel env vars are injected at build time
        // Falls back to .env file values for local development
        new webpack.DefinePlugin({
            'process.env.REACT_APP_BASE_URL': JSON.stringify(
                // If env var is set and is not HTTP on production, use it
                // Otherwise fall back to /api proxy path for Vercel HTTPS deployments
                process.env.REACT_APP_BASE_URL && !process.env.REACT_APP_BASE_URL.startsWith('http://')
                    ? process.env.REACT_APP_BASE_URL
                    : process.env.REACT_APP_BASE_URL || '/api'
            ),
            'process.env.REACT_APP_IMAGE_ENDPOINT': JSON.stringify(
                process.env.REACT_APP_IMAGE_ENDPOINT && !process.env.REACT_APP_IMAGE_ENDPOINT.startsWith('http://')
                    ? process.env.REACT_APP_IMAGE_ENDPOINT
                    : process.env.REACT_APP_IMAGE_ENDPOINT || '/'
            ),
            'process.env.REACT_APP_SITE_URL': JSON.stringify(
                process.env.REACT_APP_SITE_URL || 'https://www.jetjams.net'
            ),
        }),
    ],
})