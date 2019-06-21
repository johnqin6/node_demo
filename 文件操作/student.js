const fs = require('fs');

const dbPath = './views/db.json'
/**
 * 获取所有学生列表
 * callback 中的参数 
 * callback(err, data)  错误对象， 数据
 * return []
 */
exports.find = function (callback) {
  // 读取文件数据
  fs.readFile(dbPath, (err, data) => {
      if(err) return callback(err) 
      // 返回数据
      callback(null, JSON.parse(data).students)
  })
}

/**
 * 添加保存学生数据
 * 
 * callback 中的参数 
 * callback(err, data)  错误对象， 数据
 * return string 成功或失败
 */
exports.save = function (student, callback) {
    // 读取文件数据
    fs.readFile(dbPath, (err, data) => {
        if(err) return callback(err) 
        // 数据转为json格式
        let students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1;
        // 将添加的学生添加到数组头部
        students.push(student);
        // 将对象数据转为字符串
        let result = JSON.stringify({
            students: students
        });
        //将数据写入文件
        fs.writeFile(dbPath, result, (err) => {
            if(err) return callback(err)
            callback(null)
        })
    })
}

/**
 * 编辑学生
 * student 更新的学生数据
 * callback
 */
exports.update = function (student, callback) {
  fs.readFile(dbPath, (err, data) => {
      if(err) return callback(err)
      // 将数据转为json格式
      let students = JSON.parse(data).students
      //修改指定学生的数据
      students = students.map(item => {
          if(item.id == student.id) {
              item = {...student}
          }
          return item;
      })
      let result = JSON.stringify({
          students: students
      })
      //将数据写入文件
      fs.writeFile(dbPath, result, err => {
          if(err) callback(err)
          callback(null)
      })
  })
}
/**
 * 删除学生
 * id  学生id
 * callback
 */
exports.delete = function (id, callback) {
   fs.readFile(dbPath, (err, data) => {
        if(err) return callback(err) 
        // 数据转为json格式
        let students = JSON.parse(data).students;
        // 将数组中指定id的学生过滤掉
        students = students.filter(item => {
            return item.id != id;
        })
        let result = JSON.stringify({
            students: students
        })
        //将数据写入文件
        fs.writeFile(dbPath, result, err => {
            if(err) return callback(err)
            callback(null)
        })
   })
}