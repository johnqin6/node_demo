const express = require('express')
const Student = require('./model/student')
// 创建一个router对象
router = express.Router() 

// 访问首页
router.get('/', (req, res) => {
  // 查询数据
  Student.find((err, result) => {
      if (err) return res.send('查询失败')
      res.render('index.html', {
          students: result
      })
  })
})

// 访问新增页面
router.get('/new', (req, res) => {
    res.render('new.html')
})

// 添加学生
router.post('/add', (req, res) => {
    // 获得报文体
    let studentObj = req.body

    let student = new Student({
        ...studentObj
    })
    // 将数据保存到数据库
    student.save((err, result) => {
        if (err) res.send('保存失败')
        res.redirect('/')
    })
})

// 编辑页面
router.get('/edit', (req, res) => {
    // 将返回的id默认的引号"
    let id = req.query.id.replace(/"/g, '');
    Student.findById(id, (err, result) => {
        if (err) return res.send('查询失败')
        res.render('edit.html', {
            student: result
        })
    })
})

// 更新学生
router.post('/update', (req, res) => {
   let student = req.body;
   // 将返回的id默认的引号"
   let id = student.id.replace(/"/g, '');
   Student.findByIdAndUpdate(id, student, (err, result) => {
       if (err) return res.send('更新失败')
       res.redirect('/')
   })
})

// 删除学生
router.get('/delete', (req, res) => {
    // 获得学生id
    let id = req.query.id.replace(/"/g, "")
    // 删除学生
    Student.findByIdAndDelete(id, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/')
    })
})

// 将router 暴露出去
module.exports = router  