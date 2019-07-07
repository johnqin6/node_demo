var ArticleCateModel = require('./models/articlecate')
var UserModel = require('./models/user');
var ArticleModel = require('./models/article')

// var cate = new ArticleCateModel({
//   title: '国内新闻',
//   description: '国内新闻'
// })

// cate.save(function(err) {
//   if (err) console.log(err)
//   console.log('数据添加成功！')
// })

// var user = new UserModel({
//   username: 'lisi',
//   password: '123456',
//   name: '李四',
//   age: 22,
//   sex: 'female',
//   tel: 17634322807,
// })

var article = new ArticleModel();
article.title = '习近平访问美国';
article.cid = '5d214041b40e8b50584fe71f';
article.author_id = '5d21419aeaaedf1d0c817ffc';
article.author_name = '李四';
article.description = '习近平访问美国,此处省略300字';
article.content = '习近平访问美国,此处省略1100字';

article.save(function(err) {
  if (err) console.log(err)
  console.log('数据添加成功！')
})