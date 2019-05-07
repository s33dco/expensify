const path = require("path")
const APP_DIR = path.resolve(__dirname, "../src/app.js")
const HtmlPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")

module.exports = {
	mode: "none",
	entry: ["@babel/polyfill", APP_DIR],
	plugins: [
		new HtmlPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new CopyWebpackPlugin([{ from: "./src/static/images", to: "images" }]),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		})
	],
	module: {
		rules: [
			{
				loader: "babel-loader",
				test: /\.js$/, //regexp for .js files
				exclude: /node_modules/
			}
		]
	}
}
