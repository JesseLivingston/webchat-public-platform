// 在Cloud code里初始化express框架
var express = require('express');
var crypto = require("crypto");
var app = express();
var WEBCHAT_TOKEN = "634c5e6fe5904fd0b052d62a247dbb07";

// App全局配置
app.set('views','cloud/views');   //设置模板目录
app.set('view engine', 'ejs');    // 设置template引擎
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get("/", function(req, res){
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var strArr = [WEBCHAT_TOKEN, timestamp, nonce];
  console.log("signature: " + signature);
  console.log("timestamp: " + timestamp);
  console.log("nonce: " + nonce);
  console.log("strArr: " + strArr);
  
  var joinedStr = strArr.sort().join("");
  var sha1 = crypto.createHash("sha1");
  sha1.update(joinedStr);
  var sha1Crypto = sha1.digest("hex");
  console.log("crypted: " + sha1Crypto);
  console.log("request: " + echostr);
  //res.writeHead({"Content-Type": "text/plain"});
  if(sha1Crypto == signature){  
    res.send(200, echostr);
  }else{
    res.send(200, WEBCHAT_TOKEN);
  }
  //res.end();
});

app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});
//最后，必须有这行代码来使express响应http请求
app.listen();
