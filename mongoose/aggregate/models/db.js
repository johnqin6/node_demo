var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, function() {
  console.log('数据库服务器连接成功!');
});

module.exports = mongoose

