const express = require('express')
const router = require('./router')
// 创建一个express实例
const app = new express()  

// 静态化 publlic 目录
app.use(express.static('public'))
// parse application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}))       
//配置art-template模板
app.engine('html', require('express-art-template'))

// 使用router
app.use(router)

app.listen(3000, () => {
    console.log('服务器开启，访问地址：http://localhost:3000')
})
