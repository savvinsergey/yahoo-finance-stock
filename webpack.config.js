module.exports = {
    entry:'./app/app.js',
    output:{
        path: __dirname + '/build',
        filename: '[hash].app.js'
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
    },
    devServer: {
        inline: true,
        contentBase: './build',
        host: 'localhost',
        port: 3000
    }
};
