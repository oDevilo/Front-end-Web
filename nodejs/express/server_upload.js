var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/public/'}).array('image'));

app.get('/', function (req, res) {
   // __dirname 表示当前执行脚本所在的目录
   res.sendFile( __dirname + "/" + "file_upload.htm" );
})

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        console.log("写在此目录：" + des_file);
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log(err);
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log(response);
          res.end(JSON.stringify(response));
       });
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})