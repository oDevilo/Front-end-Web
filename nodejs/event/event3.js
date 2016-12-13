var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 通过addListener绑定事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 通过on绑定事件,on是addListener的别名，处理函数为 listener2
eventEmitter.on('connection', listener2);

// once为指定事件注册一个单次监听器，即监听器只会触发一次，触发后立刻解除该监听器
eventEmitter.once('connection', listener1);

// EventEmitter.listenerCount返回注册了指定事件的监听器数量
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 测试once是否会移除监听器
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");