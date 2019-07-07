var mongoose = require('./db')

var Schema = mongoose.Schema

var ArticleSchmea = new Schema({
  cid: {
    type: Schema.Types.ObjectId,
    ref: 'Articlecate'  // 与文章分类建立关系
  },
  title: String,
  description: String,
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'   // 与用户建立关系
  },
  author_name: String,
  content: String,
  add_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', ArticleSchmea, 'article')
