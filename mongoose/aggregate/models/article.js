var mongoose = require('./db')

var Schema = mongoose.Schema

var ArticleSchmea = new Schema({
  cid: {
    type: Schema.Types.ObjectId
  },
  title: String,
  description: String,
  author_id: {
    type: Schema.Types.ObjectId
  },
  author_name: String,
  content: String,
  add_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', ArticleSchmea, 'article')
