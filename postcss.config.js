
// 原本 webpack.config.js 文件是这样的：

// {
// 	test: /\.less$/,
// 		use: ['style-loader', 'css-loader', 'less-loader', {
// 			// 自动添加前缀 
// 			// 例如 display: flex; 
// 			// 会自动添加前缀 变成 display: -webkit-box; display: -ms-flexbox; display: flex;
// 			loader: 'postcss-loader',
// 			options: {
// 				plugins: () => [
// 					require('autoprefixer')({
// 						// 兼容最新两个版本 市场占有率>1%的浏览器都支持
// 						overrideBrowserslist: ['last 2 versions', '>1%']
// 					})
// 				]
// 			}
// 		}],
// }


// 现在将postcss-loader 部分拿出来 可以减少 webpack.config.js 文件的体积
module.exports = {
	plugins: [
		require('autoprefixer')({
			// 兼容最新两个版本 市场占有率>1%的浏览器都支持
			overrideBrowserslist: ['last 2 versions', '>1%']
		})
	]
}