import axios from 'axios'
import bg from './images/bg.png'
import './styles/index.less'

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
document.write('eeeee')
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

