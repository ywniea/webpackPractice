# webpack
模块打包工具。

```bash
# 开启后台
nodemon backend/back.js
```

### 开始

```bash
npm install webpack webpack-cli --save-dev
npx webpack -v

# 运行打包
npx webpack
npx webpack --config webpack.config.js
```

默认入口文件为`src/index.js`生成目标文件到默认目录`dist`下，手动创建index.html

添加`webpack.config.js`

```js
// webpack.config.js
const path = require('path')

module.exports = {
	entry: {
		index: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]_[chunkhash:8].js"
	},
	mode: "development"
}
```

在`package.json`中添加

```json
// 
  "scripts": {
     "build": "webpack"
  },
```

之后就可以直接使用这个命令运行打包

```
npm run build
```

### loaders

```bash
npm install --save-dev style-loader css-loader file-loader url-loader

# 自动添加前缀
npm i -D postcss-loader autoprefixer

```

可以将 postcss-loader 相关配置放到 `postcss.config.js` 文件中。

loader执行顺序：

```json
// webpack.config.js
		rules:	[
			{
				test: /\.less$/,
				// use 中使用的loader  从右往左依次执行
				// less-loader 将less 文件转成 css文件
				// css-loader 将所有css文件合并成一个文件
				// style-loader 将这个合并后的css文件添加到html文件的style标签中
				use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
			}
		]
```


### plugins

```bash
# 在每次构建打包之前都将dist目录下生成的文件删掉
npm install --save-dev clean-webpack-plugin

# 将css文件抽离出一个独立的文件
npm install --save-dev mini-css-extract-plugin
```

### HotModuleReplacementPlugin 热模块替换 局部刷新 不要在生产环境用
https://www.webpackjs.com/guides/hot-module-replacement/

针对 css 文件：
```json
// webpack.config.js

output: {
	path: path.resolve(__dirname, "dist"),
	// 打包后的文件名为 原来的名字+chunkhash:8 取8位hash值
- filename: "[name]_[chunkhash:8].js"
+	filename: "[name].js"
}

plugins: [
	new webpack.HotModuleReplacementPlugin()
]

devServer: {
	contentBase: './dist',
	open: true,
	port: 3001,

+	hotOnly: true
}

```
同时使用'style-loader'，而不是 MiniCssExtractPlugin.loader。

针对js 文件，使用 `module.hot` 来判断是否开启了热模块替换，如果开启了，使用 `module.hot.accept`来监听目标文件，如果有改动，则单独修改目标文件。
```js
// src/index.js

if (module.hot) {
  module.hot.accept("./targetDir/target", function() {
		// 监听到目标模块改动，执行回调函数 do somethin...
		// 将目标文件移除
		// 例如 document.body.removeChild(document.getElementById("number"));
		// 重新执行目标文件
    // 例如 number();
  });
}
```

其他：React hot loader https://github.com/gaearon/react-hot-loader

### devtool

#### source-map

```json
// webpack.config.js

devtool: 'source-map'
```
`source-map` 可以产生源代码到打包后的代码的映射。可以方便的定位到源代码。例如代码中有错误，错误信息可以根据映射显示出源代码中错误的位置。
设置这个之后会对构建速度产生影响，具体看官方给出的建议 https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx

#### webpack-dev-server

```bash
npm install webpack-dev-server -D
```

```json
// webpack.config.js
devServer: {
	// 指定要访问的服务器静态资源目录
	contentBase: './dist',
	// 自动打开浏览器
	open: true,
	// 服务器端口
	port: 3001
}
```

设置好 `webpack-dev-server` 之后就不会在 `__dirname` 的 `dist` 目录下产生打包后的文件了，而是将打包后的文件放在服务器内存的 `output` 指定的输出目录中。然后根据 `contentBase` 指向那个输出目录。 放在内存中速度快。

所以访问 `http://localhost:3001/index.html` 和 `http://localhost:3001`  是一样的。默认打开`webpack-dev-server 服务器` 内存的  `index.html`。

### webpack.base.js webpack.dev.js webpack.pro.js
根据配置的作用环境不同，将只在生产环境下配置的放到 `webpack.pro.js` 文件中，只在开发环境下的配置放到 `webpack.dev.js` 文件中，在两个环境中相同的配置放到 `webpack.base.js` 文件中。

修改 `package.json` 
```json
// package.json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"build": "webpack --config ./wepack.pro.js",
	"dev": "webpack-dev-server --config ./webpack.dev.js"
}
```

安装 merge 工具

```bash
npm install webpack-merge -D
```

```js
// webpack.pro.js
const merge = require('webpack-merge')
const baseConfiger = require('./webpack.base')

const proConfiger = {...}

module.exports = merge(baseConfiger, proConfiger)
```

### babel
```bash
npm install babel-loader @babel/core @babel/preset-env -D
```



