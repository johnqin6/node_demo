let express = require('express');
// let fs = require('fs'); 

//1.创建一个router对象
let router = express.Router(); 

// 引入封装的方法 
let students = require('./student.js')

//2. 把路由挂载在router上
router.get('/', (req, res) => {
    // readFile 的第二个参数是可选的，传入utf-8,读取到的文件会直接按照utf-8编码的方式转换
    // 也可以使用data.string() 进行转换成字符串
    // fs.readFile('./views/db.json', 'utf-8', (err, data) => {
    //     if(err) {
    //         return res.status(500).send('服务器错误');
    //     }
    //     let students = JSON.parse(data).students;
    //     res.render('index.html', {
    //         students: students
    //     });
    // });
    students.find((err, data) => {
        if(err) return res.status(500).end('服务器错误');
        res.render('index.html', {
            students: data
        })
    })
});

// 进入添加学生页面
router.get('/new', (req, res) => {
    res.render('new.html',{});
})

// 添加学生
router.post('/add', (req, res) => {
    students.save(req.body, (err) => {
        if(err) return res.send(err);
        res.redirect('/');
    })
})

// 进入编辑页面 
router.get('/edit', (req, res) => {
    //获得学生id
    let id = req.query.id;
    // 获得学生数据
    students.find((err, data) => {
        if(err) return res.status(500).end('服务器错误');
        let student = data.filter(item => {
            return item.id == id
        })
        res.render('edit.html', {
            student: student[0]
        })
    })
})

// 更新学生
router.post('/update', (req, res) => {
   students.update(req.body, err => {
      if(err) return res.send(err);
      res.redirect('/');
   })
})

// 删除学生
router.get('/delete', (req, res) => {
    //获取学生id
    let id = req.query.id;
    //删除学生
    students.delete(id, err => {
        if(err) return res.send(err);
        res.redirect('/');
    })
})

//3. 导出router
module.exports = router;