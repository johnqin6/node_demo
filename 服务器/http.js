let http = require('http');
let fs = require('fs');

let server = http.createServer();

server.on('request', (req, res) => {
    let url = req.url;
    console.log(req);
    if(url === '/'){
        fs.readFile('./resource/main.html', (err, data) => {
            if(err) {
                res.setHeader('Content-Type', 'text/plain; chartset=utf-8');
                res.end('文件读取失败，请稍后重试');
            }else{
                // res.setHeader('Content-Type','text/html; chartset=utf-8');
                res.end(data);
            }
        })
    }else{
        res.end('404');
    }
});

server.listen(3001, () => {
    console.log('服务器开启，访问http://localhost:3001');
});