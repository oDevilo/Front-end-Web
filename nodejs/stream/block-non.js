var fs = require('fs');
fs.readFile('input.txt', function(err, data){
	if (err) return console.error(err);
	console.log(data.toString());
});

// 非阻塞阻塞代码，程序不等文件读取完就继续执行,输出如下
// 程序执行结束
// 菜鸟教程官网地址：www.runoob.com
console.log("程序执行结束");