const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/playground/destructuring.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module : {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,              //regexp for .js files
            exclude: /node_modules/
        }, {

            test : /\.s?css$/,
            use : [                     // multiple loaders in array
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback : true
    }
};