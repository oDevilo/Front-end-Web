/*
	__filename
	表示当前正在执行的脚本的文件名。
	它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。
	如果在模块中，返回的值是模块文件的路径。
*/
console.log( __filename);

/*
	__dirname
	表示当前执行脚本所在的目录
*/
console.log( __dirname);