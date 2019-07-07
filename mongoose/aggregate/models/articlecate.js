var mongoose = require('./db')

var Schema = mongoose.Schema

var ArticlecateSchema = new Schema({
  title: String,
  descript: String,
  add_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Articlecate', ArticlecateSchema, 'articlecate')
