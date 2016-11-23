module.exports = {
    entry:'./app/app.js',
    output:{
        path: __dirname + '/build',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test:/\.js$/ ,
                loader:'babel-loader',
                query: {
                    presets: ['react','es2015']
                }
            }
        ]
    }
};
