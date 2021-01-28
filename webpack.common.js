const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports={
    entry: './src/index.js',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|s[ac]ss)$/,
                exclude: /(node_modules|bower_components)/,
                use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    output:{
        path: path.resolve(__dirname, './public'),
        filename: '[name][contenthash].js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'React From Scratch',
            template: path.resolve(__dirname, './index.html'),
            filename: path.resolve(__dirname, './public/index.html')
        })
    ]
}