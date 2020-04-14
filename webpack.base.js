const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
	entry: {
		index: "./src/index.js"
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images/',
						limit: 223
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '这是 HtmlWebpackPlugin 中设置的title',
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			filename: 'index.html'
		}),
		new CleanWebpackPlugin()
	]
};
