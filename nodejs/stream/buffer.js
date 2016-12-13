/*	Buffer(缓冲区)
	JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
	但在处理像TCP流或文件流时，必须使用到二进制数据。
	因此在 Node.js中，定义了一个 Buffer 类，用来创建一个专门存放二进制数据的缓存区。
*/
// 创建长度为10字节的buffer
var buf1 = new Buffer(10);
// 通过指定数组创建bugger
var buf2 = new Buffer([10, 20, 30, 40, 50]);
// 通过字符串来创建buffer,utf-8 是默认的编码方式
// 此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"
var buf3 = new Buffer("www.baidu.com", "utf-8");

/*
	写入缓冲区
	buf.write(string[, offset[, length]][, encoding])
	返回实际写入的大小，如果空间不足，则只会写入部分
	string - 写入缓冲区的字符串。
	offset - 缓冲区开始写入的索引值，默认为 0 。
	length - 写入的字节数，默认为 buffer.length
	encoding - 使用的编码。默认为 'utf8' 。
*/
len = buf1.write("https://github.com");
console.log("写入字节数：" + len);
console.log(buf1);

// buf为一个数组，通过角标赋值26字母
var buf4 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf4[i] = i + 97;
}

/*
	从缓冲区读取数据
	buf.toString([encoding[, start[, end]]])
	encoding - 使用的编码。默认为 'utf8' 。
	start - 指定开始读取的索引位置，默认为 0。
	end - 结束位置，默认为缓冲区的末尾
*/
console.log(buf4.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf4.toString('ascii',0,5));   // 输出: abcde
console.log(buf4.toString('utf8',0,5));    // 输出: abcde
console.log(buf4.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


/* 
	Buffer与JSON的转换
*/
var bjson = buf3.toJSON(buf3);
console.log(bjson);


/*
	缓冲区合并
	Buffer.concat(list[, totalLength])
	list - 用于合并的 Buffer 对象数组列表。
	totalLength - 指定合并后Buffer对象的总长度。
*/
var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
console.log(Buffer.concat([buffer1,buffer2]).toString());


/*
	缓冲区比较
	buf.compare(otherBuffer);
	比较当前缓冲区和另一个缓冲区的大小，相等返回0，小于返回-1，大于返回1
*/
var bufc1 = new Buffer('ABeC');
var bufc2 = new Buffer('ABCD');
var comparer = bufc1.compare(bufc2);
if(comparer < 0) {
   console.log(bufc1 + " 比 " + bufc2 + "小");
}else if(comparer == 0){
   console.log(bufc1 + " 与 " + bufc2 + "相同");
}else {
   console.log(bufc1 + " 比 " + bufc2 + "大");
}


/*
	缓冲区拷贝
	buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
	targetBuffer - 要拷贝的 Buffer 对象。
	targetStart - 数字, 可选, 默认: 0
	sourceStart - 数字, 可选, 默认: 0
	sourceEnd - 数字, 可选, 默认: buffer.length
*/
var copy1 = new Buffer('ABCD');
// 拷贝一个缓冲区
var copy2 = new Buffer(3);
copy1.copy(copy2);
console.log("拷贝" + copy2.toString());


/*
	缓冲区裁剪
	buf.slice([start[, end]])
	返回一个新的缓冲区，和旧缓冲区指向同一块内存，但是从start到end的位置剪切
	start - 数字, 可选, 默认: 0
	end - 数字, 可选, 默认: buffer.length
*/
var slice1 = new Buffer('runoob');
// 剪切缓冲区
var slice2 = slice1.slice(0,2);
console.log("裁剪" + slice2.toString());