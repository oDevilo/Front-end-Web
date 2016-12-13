/*
	util.inherits(constructor, superConstructor)
	一个实现对象间原型继承的函数。
	但只继承父对象在原型中定义的函数，
	而构造函数内部创造的属性和函数都没有被继承。
*/
var util = require('util'); 
function Base() { 
	// 内部的属性和方法不被继承
	this.name = 'base'; 
	this.base = 1991; 
	this.sayHello = function() { 
	console.log('Hello ' + this.name); 
	}; 
} 
// 可以被继承的方式
Base.prototype.showName = function() { 
	console.log(this.name);
};
Base.prototype.baseid = 3306;
function Sub() { 
	this.name = 'sub'; 
} 
util.inherits(Sub, Base); // Sub继承自Base
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName();
console.log(objSub.baseid)
// objSub.sayHello(); 
console.log(objSub);


console.log("\n");
/*
	util.inspect(object,[showHidden],[depth],[colors])
	将任意对象转换 为字符串的方法，通常用于调试和错误输出
	至少接受一个参数 object，即要转换的对象。
	showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
	depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。
		如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
	如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
*/
function Person() { 
	this.name = 'byvoid'; 
	this.toString = function() { 
		return this.name; 
	}; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true));


console.log("\n");
/*
	util.isArray(object)
	如果给定的参数 "object" 是一个数组返回true，否则返回false。
*/
console.log(util.isArray([])) // true
console.log(util.isArray(new Array)); // true
console.log(util.isArray({})); // false


console.log("\n");
/*
	util.isRegExp(object)
	如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
*/
console.log(util.isRegExp(/some regexp/)) // true
console.log(util.isRegExp(new RegExp('another regexp'))); // true
console.log(util.isRegExp({})); // false


console.log("\n");
/*
	util.isDate(object)
	如果给定的参数 "object" 是一个日期返回true，否则返回false
*/
console.log(util.isDate(new Date())) // true
console.log(util.isDate(Date())); // false (without 'new' returns a String)
console.log(util.isDate({})); // false


console.log("\n");
/*
	util.isError(object)
	如果给定的参数 "object" 是一个错误对象返回true，否则返回false
*/
console.log(util.isError(new Error())) // true
console.log(util.isError(new TypeError())); // true
console.log(util.isError({ name: 'Error', message: 'an error occurred' })); // false