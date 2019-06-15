//引入http模块
var http = require('http');
var querystring = require('querystring');
//创建一个server实例
var server = http.createServer();

//监听客户端请求
server.on('request', function(req, res){
    //console.log('收到客户端请求');
    //console.log('请求路径为：' + request.url);
    //response.write('hello world');
    //response.end('结束了');
    var jsonData = [
        {
            'name': '小明',
            'age': 19
        },
        {
            'name': '小张',
            'age': 19
        },
        {
            'name': '小李',
            'age': 19
        }
    ];
    //将json数据转为字符串
    var jsonStr = JSON.stringify(jsonData);
    res.write("<head><meta charset='utf-8'></head>");
     //1. 获取请求路径
     var url = req.url;
     console.log(querystring.unescape(url));
     //2. 根据不同请求返回不同的响应
     if(url === '/'){
        // res.setHeader('Content-Type','text/html; chartset=utf-8')
        res.end('你好');
        res.end('<p>你好</p>');
        console.log('访问的客户端的地址是：'+ req.socket.remoteAddress, req.socket.remotePort);
     }else if(url === '/login'){
        res.end('login page');
     }else if(url === '/json'){
        // res.setHeader('Content-Type','text/json; chartset=utf-8')
        res.end(jsonStr);
     }else{
        res.end('404');
     }
});

//开启服务器
server.listen(3000, function(){
    console.log('服务器已开启,通过127.0.0.1访问服务器');
});