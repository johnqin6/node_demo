const mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/user', {useNewUrlParser: true})
const Schema = mongoose.Schema

// 设计集合结构
const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],   // 枚举
        default: 0
    },
    age: {
        type: String
    },
    hobby: {
        type: String
    }
})

// 将文档发布为模型
const Student = mongoose.model('Student', studentSchema)

module.exports = Student;