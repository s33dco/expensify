const path = require('path')
const APP_DIR = path.resolve(__dirname, '../src/app.js')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
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
			'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), // this
			'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN), // should
			'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL), // all
			'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID), // be
			'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET), // in
			'process.env.MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID), // the
			'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID) // backend
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
