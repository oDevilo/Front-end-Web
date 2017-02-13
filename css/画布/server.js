// 引入模块 npm install socket.io下载socket.io
var http = require('http'),
    express = require("express"),
    socket = require("socket.io"),
    fs = require("fs");



app = express();
// 创建一个服务器
server = http.createServer(app);

app.use('/', express.static(__dirname));
console.log("应用路径：" + __dirname);
// 监听8080端口
server.listen(8888);
console.log("server started");




