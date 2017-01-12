window.onload = function() {
	// 实例并初始化hichat程序
	var hichat = new HiChat();
	hichat.init();
};

// 定义hichat类
var HiChat = function() {
	this.socket = null;
};

// 向原型添加业务方法
HiChat.prototype = {
	init: function() { // 此方法初始化程序
		var _this = this,
		    myEmojis = [];
		this.socket = io.connect(); // 与服务器进行连接
		// 监听socket的connect事件，此事件表示连接已经建立
		this.socket.on('connect', function() {
			//连接到服务器后，显示昵称输入框
			document.getElementById('info').textContent = '请输入您的用户名:)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
		});
		this.socket.on('disconnect', function(socket) {
			alert("与服务器断开连接......");
			_this.socket.disconnect();
		});

		this.socket.on('nickExisted', function() {
			document.getElementById('info').textContent = '此昵称已被注册，请重新输入';
		});
		// 如果昵称没有被使用，则将昵称加入users，同事将其作为一个属性保存到socket变量
		this.socket.on('loginSuccess', function() {
		    document.title = 'WeChat | ' + document.getElementById('nicknameInput').value;
		    document.getElementById('loginWrapper').style.display = 'none';//隐藏遮罩层显聊天界面
		    document.getElementById('messageInput').focus();//让消息输入框获得焦点
 		});
 		// 接收system事件
 		this.socket.on('system', function(nickName, userCount, type){
 			// 判断用户是连接还是离开，以显示不同信息
 			var msg = nickName +"  " + (type == 'login' ? '加入':'离开');
 			//指定系统消息显示为红色
 			_this._displayNewMsg('system', msg, 'red');
 			// 将在线人数显示到页面顶部
 			document.getElementById('status').textContent = "在线用户数：" + userCount;
 		});
 		// 接收新消息
 		this.socket.on('newMsg', function(user, msg, color) {
		    _this._displayNewMsg(user, msg, color);
		});
		// 接收图片
		this.socket.on('newImg', function(user, img) {
			_this._displayImage(user, img);
		});
		// 初始化表情
		this.socket.on('emojis', function(user, emojis) {
			myEmojis = []; // 防止同一浏览器，图片重复显示
			emojis.forEach(function(emoji){
				myEmojis.push(emoji);
			});
		});


 		// 点击登录的事件
 		document.getElementById("loginBtn").addEventListener('click', function(){
			var nickName = document.getElementById('nicknameInput').value;
			// 检查输入是否为空
			if (nickName.trim().length != 0) {
				// 不为空，则发起一个login事件并将输入的昵称发送到服务器
				_this.socket.emit('login', nickName);
			} else {
				// 否则输入框获得焦点
				document.getElementById('nicknameInput').focus();
			}
		}, false);


		// 点击发送的事件
		document.getElementById('sendBtn').addEventListener('click', function() {
		    var messageInput = document.getElementById('messageInput'),
		        msg = messageInput.value,
		        // 获取颜色值
		        color = document.getElementById('colorStyle').value;
		    messageInput.value = '';
		    messageInput.focus();
		    if (msg.trim().length != 0) {
		        _this.socket.emit('postMsg', msg, color); // 把消息发送到服务器
		        _this._displayNewMsg('me', msg, color);   // 把自己的消息显示到自己的窗口中
		    };
		}, false);


		// 发送图片
		document.getElementById('sendImage').addEventListener('change', function() {
	    //检查是否有文件被选中
		    if (this.files.length != 0) {
		        //获取文件并用FileReader进行读取
		        var file = this.files[0];
		        var reader = new FileReader();
		        if (!reader) {
		            _this._displayNewMsg('system', "你的浏览器不支持fileReader", 'red');
		            this.value = '';
		            return;
		        };
		        reader.onload = function(e) {
		            //读取成功，显示到页面并发送到服务器
		            this.value = '';
		            _this.socket.emit('img', e.target.result);
		            _this._displayImage('me', e.target.result);
		        };
		        reader.readAsDataURL(file);
		    };
		}, false);

		
		// 表情按钮点击
		document.getElementById('emoji').addEventListener('click', function(e) {
			// 加载表情
			_this._initialEmoji(myEmojis);
		    var emojiwrapper = document.getElementById('emojiWrapper');
		    emojiwrapper.style.display = 'block';
		    e.stopPropagation();
		}, false);
		document.body.addEventListener('click', function(e) {
		    var emojiwrapper = document.getElementById('emojiWrapper');
		    if (e.target != emojiwrapper) {
		        emojiwrapper.style.display = 'none';
		    };
		});
		document.getElementById('emojiWrapper').addEventListener('click', function(e) {
		    //获取被点击的表情
		    var target = e.target;
		    if (target.nodeName.toLowerCase() == 'img') {
		        var messageInput = document.getElementById('messageInput');
		        messageInput.focus();
		        messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
		    };
		}, false);


		// 按键操作--回车发送信息
		document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
		    if (e.keyCode == 13) {
		        var nickName = document.getElementById('nicknameInput').value;
		        if (nickName.trim().length != 0) {
		            _this.socket.emit('login', nickName);
		        };
		    };
		}, false);
	    document.getElementById('messageInput').addEventListener('keyup', function(e) {
	        var messageInput = document.getElementById('messageInput'),
	            msg = messageInput.value,
	            color = document.getElementById('colorStyle').value;
	        if (e.keyCode == 13 && msg.trim().length != 0) {
	            messageInput.value = '';
	            _this.socket.emit('postMsg', msg, color);
	            _this._displayNewMsg('me', msg, color);
	        };
	    }, false);


	    document.getElementById('clearBtn').addEventListener('click', function(e) {
	    	var container = document.getElementById('historyMsg');
	    	container.innerHTML = '';
	    });
	},
	// 展示信息
	_displayNewMsg: function(user, msg, color) {
		var container = document.getElementById('historyMsg'),
		    msgToDisplay =document.createElement('p'),
		    date = new Date().toTimeString().substr(0, 8),
		    // 将消息中的表情转化为图片
		    msg = this._showEmoji(msg);
		msgToDisplay.style.color = color || '#000';
		msgToDisplay.innerHTML = user + '<span class="timespan"> (' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay); // 显示信息
        container.scrollTop = container.scrollHeight;
	},
	// 展示图片
	_displayImage: function(user, imgData, color) {
	    var container = document.getElementById('historyMsg'),
	        msgToDisplay = document.createElement('p'),
	        date = new Date().toTimeString().substr(0, 8);
	    msgToDisplay.style.color = color || '#000';
	    msgToDisplay.innerHTML = user + '<span class="timespan"> (' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
	    container.appendChild(msgToDisplay);
	    container.scrollTop = container.scrollHeight;
	},
	// 加载表情
	_initialEmoji: function(myEmojis) {
	    var emojiContainer = document.getElementById('emojiWrapper'),
	        docFragment = document.createDocumentFragment();
	    emojiContainer.innerHTML = ''; // 先清空原来的内容，重新加载
	    for (var i = 0; i < myEmojis.length; i++) {
	        var emojiItem = document.createElement('img');
	        emojiItem.src = '../emoji/' + myEmojis[i];
	        emojiItem.title = myEmojis[i];
	        docFragment.appendChild(emojiItem);
	    };
	    emojiContainer.appendChild(docFragment);
	},
	// 展示表情
	_showEmoji: function(msg) {
	    var match, result = msg,
	        reg = /^(\[emoji:)[\w\W]*(\])$/g, // 匹配以[emoji: ]结尾的字符串 不能用 ' ' 要用/ /
	        totalEmojiNum = document.getElementById('emojiWrapper').children.length;
	    while (match = reg.exec(msg)) {
	        var emoji = match[0].slice(7, -1);
	        result = result.replace(match[0], '<img class="emoji" src="../emoji/' + emoji + '" />');
	        // if (emoji > totalEmojiNum) {
	        //     result = result.replace(match[0], '[X]');
	        // } else {
	        //     result = result.replace(match[0], '<img class="emoji" src="../emoji/' + emojiIndex + '" />');
	        // };
	    };
	    return result;
	}
};