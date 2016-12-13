var fs = require("fs");
var data = fs.readFileSync("input.txt");

// 阻塞代码，程序等文件读取完再继续执行,输出如下
// 菜鸟教程官网地址：www.runoob.com
// 程序执行结束
console.log(data.toString());
console.log("程序执行结束");