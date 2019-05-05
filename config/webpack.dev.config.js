const path = require("path")
const Merge = require("webpack-merge")
const CommonConfig = require("./webpack.common.config.js")

module.exports = Merge(CommonConfig, {
	output: {
		path: path.join(__dirname, "../dev"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	optimization: {
		minimize: false
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "../dev"),
		open: "Google Chrome",
		historyApiFallback: true
	}
})
