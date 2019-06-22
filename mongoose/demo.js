const mongoose = require('mongoose');

// 连接mongodb数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// 使用 
mongoose.Promise = global.Promise;  

// 创建一个模型，即设计数据库
const Cat = mongoose.model('Cat', {name: String});

// 实例化一个 Cat
const Kitty = new Cat({ name: 'john'});

// 持久化保存 kitty 实例
Kitty.save(err => {
    if (err) return console.log(err)
    console.log(11);
})