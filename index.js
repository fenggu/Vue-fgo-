var express = require('express')
var app = express()
var request = require('request')
var cheerio = require('cheerio') 
// let AVA_LENGTH = 10
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.get('/get-fgo', function(req, res) {
  request('http://fgowiki.com/capsule-result/55/', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var data = {
      	img: []
      } 
      var pic_panel = $('.DataJson').text()
      imgArr = JSON.parse(pic_panel)
      console.log(imgArr)
      for (var j = 0; j < imgArr.length; j++) { 
        data.img.push(imgArr[j].data.image)
      }
      res.json({success: true, resDate: data})
    }
  })
}); 
var server = app.listen(3000, function() {

  app.use(express.static('src'));
  console.log('listening at 3000');
});