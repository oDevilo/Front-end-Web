// 引入模块
var http = require('http');
var express = require("express");
var socket = require("socket.io");

app = express();
// 创建一个服务器
server = http.createServer(app);
io = socket.listen(server); // 绑定socket.io到服务器
users = []; // 用于保存所有在线的用户昵称

app.use('/', express.static(__dirname + '/www'));
// 监听8080端口
server.listen(8888);
console.log("server started");

// socket部分
io.on('connection', function(socket){
	// 昵称设置,on表示监听的方法
	// emit表示发送方法，socket.broadcast.emit 表示向除自己外所有人发送
	socket.on('login', function(nickname) {
		if (users.indexOf('nickname') > -1) {
			socket.emit('nickExisted');
		} else {
			socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			socket.emit('loginSuccess');
			// 向所有连接的客户端发送当前登录用户的昵称
			io.sockets.emit('system', nickname,users.length,'login'); 
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
    socket.on('postMsg', function(msg) {
        //将消息发送到除自己外的所有用户
        socket.broadcast.emit('newMsg', socket.nickname, msg);
    });

    //接收用户发来的图片
    socket.on('img', function(imgData) {
    	// 通过newimg事件分发到除自己外的所有用户
    	socket.broadcast.emit('newImg', socket.nickname, imgData);
    });
});
