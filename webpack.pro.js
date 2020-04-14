const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfiger = require('./webpack.base')

const proConfiger = {
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]_[chunkhash:8].js"
	},
	mode: "production",
	devtool: 'none',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', 'less-loader', 'postcss-loader'],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name]_[contenthash:8].css'
		})
	]
}

module.exports = merge(baseConfiger, proConfiger)