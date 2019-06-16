const express = require('express');
//创建 app实例
const app = express();

//中间件
app.get('/', (req, res) => {
    res.send('hello express2');
});

// 监听端口
app.listen(3000, () => {
    console.log('服务器开启，访问地址：http://localhost:3000');
});