const path = require("path")
const Merge = require("webpack-merge")
const CommonConfig = require("./webpack.common.config.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")

module.exports = Merge(CommonConfig, {
	output: {
		path: path.join(__dirname, "../production"),
		filename: "bundle-[contenthash].js"
	},
	plugins: [new MiniCssExtractPlugin({ filename: "styles-[contenthash].css" })],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true }
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserJSPlugin({ sourceMap: true }),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					map: {
						inline: false
					}
				}
			})
		]
	},
	devtool: "source-map"
})
