const path = require("path")
const APP_DIR = path.resolve(__dirname, "./src/app.js")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = env => {
	const isProduction = env === "production"
	console.log("isProduction", isProduction)

	return {
		mode: "none",
		entry: ["@babel/polyfill", APP_DIR],
		output: isProduction
			? {
					path: path.join(__dirname, "prod"),
					filename: "bundle-[contenthash].js",
					devtoolLineToLine: { test: /\.js$/, include: "src/" }
			  }
			: {
					path: path.join(__dirname, "dev"),
					filename: "bundle.js",
					devtoolLineToLine: { test: /\.js$/, include: "src/" }
			  },
		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "./index.html"
			}),
			new MiniCssExtractPlugin({ filename: "styles-[contenthash].css" }),
			new CopyWebpackPlugin([{ from: "src/static/images", to: "images" }]),
			new OptimizeCSSAssetsPlugin()
		],
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
						isProduction ? MiniCssExtractPlugin.loader : "style-loader",
						"css-loader",
						"sass-loader"
					]
				}
			]
		},
		optimization: isProduction ? { minimize: true } : { minimize: false },
		devtool: isProduction ? "source-map" : "inline-source-map",
		devServer: {
			contentBase: path.join(__dirname, "dev"),
			historyApiFallback: true
		}
	}
}
