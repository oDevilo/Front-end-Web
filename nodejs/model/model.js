// 引入当前目录中的hello.js
// exports 是模块公开的接口，require 用于从外部获取一个模块的接口
var hello = require('./hello-fun');
hello.world();

var Hello = require('./hello-obj'); 
var obj = new Hello(); 
obj.setName('BYVoid'); 
obj.sayHello();