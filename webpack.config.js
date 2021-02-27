const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const buildDate = new Date().toGMTString().slice(0, 25);
const buildHash = (+new Date() / 1000).toFixed(0);

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        historyApiFallback: true,
        compress: false,
        port: 3000,
        hot: true,
        inline: true
    },
    devtool: isProd ? false : 'source-map',
    // watch: !isProd,
    context: path.resolve('./src'),
    target: 'es5',
    entry: [
        // app: './main.ts'
        './main.ts',
        './scss/hop.scss',
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts?$/,
                exclude: [/\/node_modules\//],
                // use: ['awesome-typescript-loader', 'source-map-loader']
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                    },
                },
            },
            !isProd
                ? {
                    test: /\.(js|ts)$/,
                    exclude: [/\/node_modules\//],
                    use: {
                        loader: 'istanbul-instrumenter-loader',
                    },
                }
                : null,
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        sources: false,
                    },
                },
            },
            {
                test: /\.js$/i,
                // exclude: /node_modules|assets/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: "unambiguous",
                        compact: true
                    },
                },
            },
            // {
            //     test: /\.css$/,
            //     // loaders: ['style-loader', 'css-loader']
            //     loader: 'css-loader'
            // }
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {url: false, importLoaders: 1, esModule: false},
                    },
                    // {
                    //     loader: 'postcss-loader',
                    // },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ].filter(Boolean)
    },
    node: {
        __filename: true
    },
    output: {
        filename: '[name].[fullhash].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',

    },
    plugins: [
        // moment loads all locales by default ant it takes so much space
        // This lines removes all locales except the mentioned ones.
        // You can replace /fa/ with your desired locale to keep it.
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fa/),
        // Clean up webpack-created dist folder
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',

            // title: 'HOP: The HbbTV Open Platform',
            // description: 'HbbTV Open Platform built to run on HbbTV-ready TV sets.',
            // template: '!!ejs-loader!src/index.html',
            // direction: 'rtl',
            // language: 'fa-IR',
            // languageCode: 'fa',
            // modified: buildDate,
            // buildHash: buildHash,
            // hash: true,
            inject: 'head',
            cache: false,
            // pretty: true,
            minify: true
        }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[fullhash].css',
        //     chunkFilename: '[id].[fullhash].css',
        // }),
        // Copy static files directly without any process
        new CopyWebpackPlugin({
            patterns: [
                {from: 'assets', to: 'assets/'},
                {from: '.htaccess'}
            ]
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
            // "handlebars/runtime": 'handlebars/dist/handlebars.runtime.min.js'
        }
    },
};

// module.exports = config;
