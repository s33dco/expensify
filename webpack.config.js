const path = require("path")
const APP_DIR = path.resolve(__dirname, "./src/app.js")

module.exports = {
	mode: "development",
	entry: ["@babel/polyfill", APP_DIR],
	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.js$/, //regexp for .js files
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					// multiple loaders in array
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "public"),
		historyApiFallback: true
	}
}
