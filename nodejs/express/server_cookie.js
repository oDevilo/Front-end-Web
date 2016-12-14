var express      = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/set', function(req, res) {
  // 向客户端设置一个Cookie
  res.writeHead(200, {
      'Set-Cookie': 'myCookie=test',
      'Content-Type': 'text/plain'
  });
  res.end('Set Cookies\n');
});


app.get('/get', function(req, res) {
  console.log("Cookies: ", req.cookies)
  res.end(JSON.stringify(req.cookies));
});

app.listen(8081)