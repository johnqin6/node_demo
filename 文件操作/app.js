let express = require('express');
//引入router
let router = require('./router');

let app = new express();

//静态化文件夹
app.use(express.static('public'));
//配置art-template模板
app.engine('html', require('express-art-template'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// parse application/json
// app.use(express.json())

//5. 把路由容器挂载在 app 服务上
app.use(router);

app.listen(3000, () => {
    console.log('服务器开启，访问地址：http://localhost:3000');
});


/***
 * 路由设计
 * | 请求方法 | 请求路径 | get参数 | post参数| 备注 |
 * |---------|----------|--------|---------|------|
 * |get      |'/students'|      |          | 渲染首页|
 * |get 
 */