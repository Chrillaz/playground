const fs = require('fs');
const path = require('path');
const nodemonConfig = require('./nodemon.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

const development = process.env.NODE_ENV !== 'production';

const mode = development ? 'development' : 'production';

const context = path.resolve(__dirname);

const publicDir = context + '/public';

const clientDir = context + '/client';

const serverDir = context + '/server';

const outDir = publicDir;

const entries = () => fs.readdirSync(`${clientDir}/pages`).reduce((chunks, entry) => {

    return {...chunks, [entry]: `${clientDir}/pages/${entry}/index.tsx`}
}, {
    index: `${clientDir}/index.tsx`
})

const plugins = [
    development && new NodemonPlugin({
        ...nodemonConfig,
        script: serverDir + '/index.ts',
        env: {
            PORT: process.env.PORT
        }
    }),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
    }),
    new HtmlWebpackPlugin({
        chunks: ['index'],
        inject: 'body',
        template: publicDir + '/views/index.html',
    })
].filter(Boolean)

const config = {
    mode,
    context,
    devtool: development ? 'inline-source-map' : 'source-map',
    entry: {...entries()},
    output: {
        path: outDir,
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': clientDir,
            '@components': clientDir + '/components'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve( 'ts-loader' ),
                    options: {
                        context: clientDir,
                        configFile: 'tsconfig.json'
                    }
                }
            },
        ]
    },
    plugins,
    watch: development
}

module.exports = config;