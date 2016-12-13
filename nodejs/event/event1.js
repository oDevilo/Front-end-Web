/*	事件循环
	Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
	Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
	Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
	Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
*/
/*	事件驱动程序
	Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。
	当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。
*/
// 引入events模块
var events = require('events');
// 创建eventEmitter对象(事件触发器)
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// on用于绑定事件及事件的处理程序
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// emit用于触发事件
eventEmitter.emit('connection');

console.log("程序执行完成");
