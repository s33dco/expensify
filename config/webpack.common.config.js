const path = require('path')
const APP_DIR = path.resolve(__dirname, '../src/app.js')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'dev') {
	require('dotenv').config({ path: '.env.dev' })
}

module.exports = {
	mode: 'none',
	entry: ['@babel/polyfill', APP_DIR],
	plugins: [
		new HtmlPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new CopyWebpackPlugin([{ from: './src/static/images', to: 'images' }]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.DefinePlugin({
			'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
			'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
			'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
			'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
			'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
			'process.env.MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID),
			'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
		})
	],
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/, //regexp for .js files
				exclude: /node_modules/
			}
		]
	}
}
