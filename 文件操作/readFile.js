var fs = require('fs');

/***
 * 读取文件
 * param url 文件路径
 * param 回调函数 
 * error : 读取成功 -》error 就是错误对象，否则为null
 * data: 读取成功就是读到的数据，否则为null
 */
fs.readFile('./test.txt', function(err, data) {
    console.log(data, data.toString());
});

/**
 * params1: url 文件路径
 * params2: 写入的信息
 * param 回调函数 
 */
fs.writeFile('./test.txt','大家哈，写一个信息了', function(err){
    console.log(err,'文件写入成功');
});