const path = require("path");
const webpack  = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
             {
               test: /\.(png|svg|jpg|jpeg|gif)$/i,
               type: 'asset/resource',
             }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
             template: './src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

    ],
    devServer: {
        open: true,
        hot: true
    }
}