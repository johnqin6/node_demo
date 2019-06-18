let express = require('express');
let fs = require('fs'); 

//1.创建一个router对象
let router = express.Router(); 

//2. 把路由挂载在router上
router.get('/', (req, res) => {
    // readFile 的第二个参数是可选的，传入utf-8,读取到的文件会直接按照utf-8编码的方式转换
    // 也可以使用data.string() 进行转换成字符串
    fs.readFile('./views/db.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('服务器错误');
        }
        let students = JSON.parse(data).students;
        res.render('index.html', {
            students: students
        });
    });
});

//3. 导出router
module.exports = router;