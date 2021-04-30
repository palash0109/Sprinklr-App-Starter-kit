const path = require("path");
const webpack  = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = 
    {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(js|tsx)$/,
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    plugins : [
        new HtmlWebpackPlugin({
             template: './src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

    ],
    devServer: {
        open: true,
        hot: true,
        compress: true
    }
}