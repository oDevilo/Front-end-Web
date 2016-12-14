/*
	创建目录
	fs.mkdir(path[, mode], callback)
	path - 文件路径。
	mode - 设置目录权限，默认为 0777。
	callback - 回调函数，没有参数。
*/
var fs = require("fs");
// 如果已经存在test，需要先删除,再次创建会显示目录已存在
console.log("创建目录 test");
fs.mkdir("test/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
