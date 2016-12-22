// 引入模块 npm install socket.io下载socket.io
var http = require('http'),
    express = require("express"),
    socket = require("socket.io"),
    fs = require("fs");



app = express();
// 创建一个服务器
server = http.createServer(app);
io = socket.listen(server); // 绑定socket.io到服务器
users = []; // 用于保存所有在线的用户昵称
emojis = [];

app.use('/', express.static(__dirname + '/www'));
console.log("应用路径：" + __dirname + '/www');
// 监听8080端口
server.listen(8888);
console.log("server started");

console.log("读取所有表情");
fs.readdir("www/emoji/",function(err, files){
    if (err) {
        return console.error(err);
    }
    // 读取目录中的每个文件
    files.forEach(function (file){
        console.log(file);
        emojis.push(file);
    });
});

// socket部分
io.on('connection', function(socket){
	// 昵称设置,on表示监听的方法
	// emit表示发送方法，socket.broadcast.emit 表示向除自己外所有人发送
	socket.on('login', function(nickname) {
		if (users.indexOf(nickname) > -1) { // 验证昵称是否已经存在
			socket.emit('nickExisted');
		} else {
			socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			socket.emit('loginSuccess');
			// 向所有连接的客户端发送当前登录用户的昵称
			io.sockets.emit('system', nickname, users.length, 'login');
			// 发送表情信息
			io.sockets.emit('emojis', nickname, emojis);
		}
	});
	// 用户离开时的事件
	socket.on('disconnect', function() {
		// 将断开连接的用户从users中移除
		users.splice(socket.userIndex, 1);
		// 通知除自己外的所有人
		socket.broadcast.emit('system', socket.nickname, users.length, 'loginout')
	});

	//接收新消息
    socket.on('postMsg', function(msg, color) {
        //将消息发送到除自己外的所有用户
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });

    //接收用户发来的图片
    socket.on('img', function(imgData) {
    	// 通过newimg事件分发到除自己外的所有用户
    	socket.broadcast.emit('newImg', socket.nickname, imgData);
    });
});



