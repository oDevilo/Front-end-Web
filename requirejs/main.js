/*  
	require.config是用来配置模块加载位置，
 	简单点说就是给模块起一个更短更好记的名字，
 	比如将百度的jquery库地址标记为jquery，
 	这样在require时只需要写["jquery"]就可以加载该js
	
	paths还有一个重要的功能，就是可以配置多个路径，
	如果远程cdn库没有加载成功，可以加载本地的文件
 */
 

require.config({
	paths : {
		"jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "jquery"],
		"b" : "b"
	}
});

/*在这里配置require，那么别的地方只需要加载此文件，省去了很多配置*/

require(["jquery","b","a","c"], function(){
	alert("所有js加载完成");
});