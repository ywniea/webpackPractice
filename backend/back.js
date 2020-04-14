const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//设置跨域访问 CORS
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 设置bodyParser 解析传输过来的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 处理 get 例如 axios.get('http://localhost:9000/api/name?id=2333') 
app.get('/api/name', (req, res) => {
	console.log(req.query)
	res.json({
		name: '小红'
	})
})

// 处理 post  例如 axios.post('http://localhost:9000/api/info', { id: 2 })
app.post('/api/info', (req, res) => {
	console.log(req.body)
	res.json({
		info: '你好'
	})
})

app.listen(9000)
