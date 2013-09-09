// 在Cloud code里初始化express框架
var express = require('express');
var crypto = require("crypto");
var app = express();
var WEBCHAT_TOKEN = "ariestiger";

// App全局配置
app.set('views','cloud/views');   //设置模板目录
app.set('view engine', 'ejs');    // 设置template引擎
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get("/", function(req, res){
  var signature = req.param("signature");
  var timestamp = req.param("timestamp");
  var nonce = req.param("nonce");
  var echostr = req.param("echostr");
  var strArr = [WEBCHAT_TOKEN, timestamp, nonce];
  
  var joinedStr = strArr.sort().join("");
  var sha1Crypto = crypto.createHash("sha1").digest(joinedStr);
  res.writeHead({"Content-Type": "text/plain"});
  if(sha1Crypto == signature){  
    res.write(echostr);
  }else{
    res.write(timestamp);
  }
  res.end();
});

app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});
//最后，必须有这行代码来使express响应http请求
app.listen();
