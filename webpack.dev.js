const webpack = require('webpack')
const path = require('path')
const baseConfiger = require('./webpack.base')
const merge = require('webpack-merge')

const devConfig = {
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	mode: "development",
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 3001,
		// proxy: {
		// 	"api": {
		// 		target: 'http://localhost:9000'
		// 	}
		// }
		hotOnly: true
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					'style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
			}
		]
	}
};

module.exports = merge(baseConfiger, devConfig)
