// 图片转码

var http = require('http');

//代转码的网络图片
var url = 'http://p0.meituan.net/tuanpic/3df525af5a3f7fe04077567d2a6caf794904.png';

// 网络图片转码为base64格式
http.get(url, function(res){
    var chunks = []; // 用于保存网络请求不断加载传输的缓冲数据
    var size = 0; //保存缓冲数据的总长度
    res.on('data', function(chunk) {
        /**
         * 在网络请求时，会不断接收到数据（数据不是一次性获取的）
         * node 会把接收到的数据片段逐段地保存在缓存区(Buffer)，
         * 这些数据片段会形成一个个缓冲对象（即Buffer对象）
         * 而Buffer数据的拼接并不能像字符串那样拼接（因为一个中文字符占三个字节）
         * 如果一个数据片段携带着一个中文的两个字节，下一个数据片段携带者最后一个字节，
         * 直接字符串拼接会造成乱码，为避免乱码，将得到的缓冲数据推入到chunks数组中，
         * 利用node.js内置的Buffer.concat()方法进行拼接
         */
        chunks.push(chunk); 
        size += chunk.length; //累加缓冲数据的长度
    });

    res.on('end', function(err) {
        // Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
        var data = Buffer.concat(chunks, size); 
        // 可通过Buffer.isBuffer()方法判断变量是否为一个Buffer对象
        console.log(Buffer.isBuffer(data)); 
        //将Buffer对象转换为字符串并以base64编码格式显示
        var base64Img = data.toString('base64'); 
        // console.log(base64Img); 
    });
});


const fs = require('fs');
//读取图片
let bitmap = fs.readFileSync('./image/follow_img.png');

// node v10 不建议使用buffer的方式，所以这里使用了新的API Buffer.from;
let base64str = Buffer.from(bitmap, 'binary').toString('base64'); //base64编码

let bitmap1 = Buffer.from(base64str, 'base64'); //解码图片

//写入图片
fs.writeFileSync('end.jpg', bitmap1);

//node接收post上传的图片时，发现有时curl上传过程中把base64 编码中' +'变成了空格，
// 这里要替换回来才能正确解码
var base64Data = imgData.replace(/\s/g,"+");
