
// 使用populate 需要将用的model都引入
var ArticleModel = require('./models/article');
var ArticleCateModel = require('./models/articlecate')
var UserModel = require('./models/user')

// 文章与文章分类集合关联
// ArticleModel.find({}).populate('cid').exec(function(err, docs) {
//   console.log(docs);
// })

// 三集合关联
ArticleModel.find({}).populate('cid').populate('author_id').exec(function(err, docs) {
  console.log(docs);
})