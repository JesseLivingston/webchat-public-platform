// require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
/*AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});*/

var express = require("express");
var webot = require("weixin-robot");

var app = express();

webot.set("hi", "你好！");

webot.set("subscribe", {
	pattern: function(info) {
		return info.is("event") && info.param.event === "subscribe";
	},
	handler: function(info) {
		return "欢迎订阅！";
	}
});

webot.watch(app, {
	token: "634c5e6fe5904fd0b052d62a247dbb07",
	path: "wechatapi"
})