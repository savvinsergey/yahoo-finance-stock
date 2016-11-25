const webpack = require('webpack');

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
                    presets: ['react','es2015','stage-0']
                }
            }
        ]
    },

    devServer: {
        inline: true,
        contentBase: './build',
        host: 'localhost',
        port: 3000
    },

    // devtool: 'source-map',

    externals: {
        'react/addons': 'react/addons'
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]

};
