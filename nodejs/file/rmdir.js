/*
	删除目录
	fs.rmdir(path, callback)
	path - 文件路径。
	callback - 回调函数，没有参数
*/
var fs = require("fs");

console.log("准备删除目录 test2");
// 如果文件夹内不为空，则无法删除
fs.rmdir("test2/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 test2 目录");
   fs.readdir("test2/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});