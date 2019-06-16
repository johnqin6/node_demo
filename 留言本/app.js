const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('art-template');

let comments = [
    {
        name: '张三',
        message: '今天天气不错',
        deteTime: '2015-10-23'
    },
    {
        name: '李四',
        message: '今天天气不错',
        deteTime: '2015-10-23'
    },
]

http.createServer('request', (req, res) => {
    //将路径转为对象，第二个参数为true,表示直接
    let parseObj = url.parse(req.url, true);
    //单独获取路径
    let pathname = parseObj.pathname;
    if (pathname === '/'){
        fs.readFile('./views/index.htm', (err, data) => {
            if (err) {
                res.end('404');
            }
            //data数据是否转字符串，看是否对数据操作
            let temData = template.render(data.toString(),{
                comments: comments
            });
            res.end(temData);
        });
    } else if(pathname === '/post'){
        fs.readFile('./views/post.html', (err, data) => {
            if(err) {
                res.end('404')
            };
            res.end(data);
        });
    } else if (pathname === '/pinglun') {
        //拿到参数
        let query = parseObj.query;
        let comment = {};
        comment.name = query.name;
        comment.message = query.message;
        comment.deteTime = new Date();
        comments.unshift(comment);
        // 服务端已将数据存储好，重定向首页
        // 如何通过服务端让客户端重定向
        // 1. 状态码设置为 302, 临时重定向  浏览器不记忆
        //      301 永久重定向  浏览器会记住
        // 2. 在响应的头中通过 Location 告诉客户端往哪重定向
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if(pathname.indexOf('/public/') == 0){
        // /public/css/main.css
        // 统一处理 请求路径以 /public/ 开头的静态资源
        // 加点为了转为相对路径
        fs.readFile('.' + pathname, (err, data) => {
            if(err) {
                res.end(err);
            }
            res.end(data);
        });
    } else if(pathname === '/favicon.ico') {
        res.end();
    } else {
        res.end('404, Not found');
    }
}).listen(3000, () => {
    console.log('服务器开启，访问地址：http://localhost:3000')
});