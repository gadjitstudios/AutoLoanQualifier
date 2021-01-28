const common = require('./webpack.common');
const path = require('path');

module.exports = function(){
    return{
        ...common,
        mode: 'development',
        devServer:{
            contentBase: path.join(__dirname, 'public/'),
            port: 3000,
            publicPath: 'http://localhost:3000/',
            historyApiFallback: true,
            open: true
        }
    }
}