/*
	由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，
	因此你可以手动解析后面的内容作为GET请求的参数。
	node.js中url模块中的parse函数提供了这个功能。
*/
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
	// console.log(req); // 打印request信息
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log("\n")
    console.log(req.url);
    var urll = url.parse(req.url, true);
    console.log(urll);
    var winfo = util.inspect(urll); // 将任意对象转换 为字符串
    res.end(winfo); // 将信息写在页面
}).listen(3000);

console.log("GET server");

// 尝试请求：http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc