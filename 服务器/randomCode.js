var http = require('http');

var server = http.createServer();
var req=http.request(options,(res)=>{
    var header=res.headers;
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    var html='',output;
    if(res.headers['content-encoding']=='gzip'){
        var gzip=zlib.createGunzip();
        res.pipe(gzip);
        output=gzip;
    }else{
        output=res;
    }
    output.on('data',(data)=>{
        data=data.toString('utf-8');
        html+=data;
    });
    output.on('end',()=>{
        console.log(html);
    })
});
req.on('error',error=>{console.log("error:"+error.message)});
req.end(); 
server.on('require', function(req, res) {
    res.end('你好！');
});

server.listen(3001, function(){
    console.log('服务器开启，访问地址127.0.0.1:3001');
})