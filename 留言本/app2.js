const express = require('express');

const app = new express(); 

//配置 获取 post 参数
app.use(express.urlencoded({extended:false}));

app.engine('html', require('express-art-template'));
//静态化文件夹
app.use('/public/', express.static('./public'));
// app.set('views', 'views');
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

app.get('/', (req, res) => {
    res.render('index.html', {
        comments: comments
    });
});

app.get('/post', (req, res) => {
    res.render('post.html');
});

app.post('/pinglun', (req, res) => {
    console.log(req);
    //获取post 请求的请求体数据
    let comment = req.body;
    comment.deteTime = new Date();
    comments.unshift(comment);
    //重定向
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('服务器开启, 访问地址：http://localhost:3000');
});