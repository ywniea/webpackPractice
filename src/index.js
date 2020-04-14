import axios from 'axios'
import bg from './images/bg.png'
import './styles/index.less'
import React, { Component } from "react";
import ReactDom from "react-dom";
// import '@babel/polyfill'

const img = new Image();
img.src = bg
img.setAttribute('width', '320px')
img.setAttribute('height', '180px')
const div = document.getElementById('root')
div.append(img)


axios.get('http://localhost:9000/api/name?id=2333').then(res => {
	console.log(res)
})

axios.post('http://localhost:9000/api/info', { id: 2 }).then(res => {
	console.log(res)
})
console.log('222222222222')

var btn = document.createElement("button");
var section = document.createElement("section");

btn.innerHTML = "Add";
div.append(section)
section.append(btn)


btn.onclick = function () {
	var div = document.createElement("div");
	div.innerHTML = "item";
	section.append(div);
};

const arr = [1, 2, 3];
arr.forEach((item, index) => {
	Promise.resolve(item)
	console.log(index)
})


class App extends Component {
	render() {
		return <div>hello world</div>;
	}
}
ReactDom.render(<App />, document.getElementById("root"));