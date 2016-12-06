/*define([], function(){})中第一个参数是依赖的名称数组，
第二个参数是函数，在模块的所有依赖加载完毕后，改函数被调用来定义该模块

*/
define(['c'], function(c){
	function fun1() {
		alert("it works");
	}

	fun1();

	console.log(c);
});

