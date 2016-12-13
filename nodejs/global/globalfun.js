/*
	setTimeout(cb, ms)
	全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
	setTimeout() 只执行一次指定函数。返回一个代表定时器的句柄值。
*/
function printHello(){
   console.log( "Hello, World!");
}
setTimeout(printHello, 2000);


/*
	clearTimeout(t)
	全局函数用于停止一个之前通过 setTimeout() 创建的定时器
	参数 t 是通过 setTimeout() 函数创建的定时器。
*/
var t = setTimeout(printHello, 2000);
// 清除定时器
clearTimeout(t);


/*
	setInterval(cb, ms)
	全局函数每隔指定的毫秒(ms)数后执行指定函数(cb)。
	返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
	setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
*/
setInterval(printHello, 2000);