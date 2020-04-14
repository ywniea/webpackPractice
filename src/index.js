import axios from 'axios'
import bg from './images/bg.png'
import './styles/index.less'
import React, { Component } from "react";
import ReactDom from "react-dom";
// import '@babel/polyfill'

// -----------------file-loader---------------
const img = new Image();
img.src = bg
img.setAttribute('width', '320px')
img.setAttribute('height', '180px')
const div = document.getElementById('root')
div.append(img)

// -----------devServer--proxy------------------
axios.get('http://localhost:9000/api/name?id=2333').then(res => {
	console.log(res)
})

axios.post('http://localhost:9000/api/info', { id: 2 }).then(res => {
	console.log(res)
})
console.log('222222222222')

// ----------------hot module replacement---------------------
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

// --------------babel es6+ ---------------
const arr = [1, 2, 3];
arr.forEach((item, index) => {
	Promise.resolve(item)
	console.log(index)
})

// -------------react---------------
class App extends Component {
	render() {
		return <div>hello world</div>;
	}
}

var reactdiv = document.createElement("div");
reactdiv.setAttribute('id', 'reactdiv');
div.append(reactdiv)
ReactDom.render(<App />, document.getElementById("reactdiv"));

// --------------------懒加载---------------------
const lazydiv = document.createElement('div');
lazydiv.setAttribute('id', 'lazydiv');
div.append(lazydiv);
const lazybutton = document.createElement('button');
lazydiv.append(lazybutton);
lazybutton.innerHTML = "Lazy load";

lazybutton.onclick = () =>
	import(/* webpackChunkName: "print" */ './print').then(module => {
		const print = module.default;
		print();
	});