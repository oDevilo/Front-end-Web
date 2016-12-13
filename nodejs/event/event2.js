var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
// 绑定事件
event.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
// 可以对同个事件绑定多个事件监听器，这些function会依次执行
event.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2);
});
// 设置延时执行时间
setTimeout(function() {
    event.emit('someEvent','a1','a2');
}, 1000);
