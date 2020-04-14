const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')


module.exports = {
	entry: {
		index: "./src/index.js",
		login: "./src/login.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		// 打包后的文件名为 原来的名字+chunkhash:8 取8位hash值
		// filename: "[name]_[chunkhash:8].js"
		filename: "[name].js"
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				// use: [	'file-loader']
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]', // 指定图片打包后的名称 ext指的是扩展名
						outputPath: 'images/',
						// 指定loader 为url-loader时，可以设置limit 
						// 当图片尺寸小于limit值时将图片以base64的形式打包到output文件中 减少一次image请求
						// 图片尺寸大于limit时就 直接以图片的形式打包
						limit: 4869
					}
				}
			},
			{
				test: /\.less$/,
				// use 中使用的loader  从右往左依次执行
				// less-loader 将less 文件转成 css文件
				// css-loader 将所有css文件合并成一个文件
				// style-loader 将这个合并后的css文件添加到html文件的style标签中
				use: [
					'style-loader',
					// MiniCssExtractPlugin.loader,
					'css-loader', 'less-loader', 'postcss-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					// 关于babel的配置 可以将 options 的内容放到 .babelrc 中。
					options: {
						presets: [[
							'@babel/preset-env',
							{
								targets: {
									edge: '17',
									firefox: '60',
									chrome: '67',
									safari: '11.1'
								},
								useBuiltIns: 'usage' // 按需注入
							}
						]]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			// 需要在模板中修改 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '这是 HtmlWebpackPlugin 中设置的title',
			// 指定用哪个文件作为模板
			template: './src/index.html',
			// 将打包生成的js文件注入到 head中/body中
			inject: true,
			chunks: ['index'],
			filename: 'index.html'
		}),
		// 再添加一个 生成两个 html 文件 都以 template 为模板，
		// entry中两个入口 对应output 生成两个[chunk] 
		// 两个html文件指定引入的 js文件(chunk)不同
		new HtmlWebpackPlugin({
			title: 'login',
			template: './src/index.html',
			inject: 'body',
			chunks: ['login'],
			filename: 'login.html'
		}),
		new CleanWebpackPlugin(),
		// 同时修改 用 MiniCssExtractPlugin.loader 替换 style-loader
		// 将所有 style 打包 生成一个 css 文件
		// new MiniCssExtractPlugin({
		// 	filename: '[name]_[contenthash:8].css'
		// }),
		// 开启热模块替换功能 
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'source-map',
	devServer: {
		// 指定服务器静态资源目录
		contentBase: './dist',
		// 自动打开浏览器
		open: true,
		// 服务器端口
		port: 3001,
		// proxy: {
		// 	"api": {
		// 		target: 'http://localhost:9000'
		// 	}
		// }

		// 浏览器不要自动帮忙刷新
		hotOnly: true
	}
};
