// require 指令来载入 Node.js 模块
var http = require('http');
var url =require('url');

http.createServer(function(request, response){
	// 发送HTTP头部
	// HTTP状态值：200 ：ok
	// 内容类型：text/plain
	response.writeHead(200, {'Content-Type':'text/plain'});

	// 发送相应数据
	response.write("Hello World\n");

	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.")

	response.end();
}).listen(8888); // 监听8888端口

// 打印在终端，而不是控制台
console.log('Server running at http://localhost:8888');