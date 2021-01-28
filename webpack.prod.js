const common = require('./webpack.common');

module.exports = function(){
    return{
        ...common,
        mode: 'production',
        devtool: 'source-map'
    }
}