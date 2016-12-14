var express = require('express');
var app = express();

app.use(express.static('public')); //  express.static 中间件来设置静态文件路径

app.get('/', function (req, res) {
   // 或直接访问 http://127.0.0.1:8081/images/logo.png
   // 对比http.js
   res.send('<font color="red">Hello World</font><img src="logo.png">');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})