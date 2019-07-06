var mongoose = require('./db.js');
var Schema = mongoose.Schema;

// 定义order_itemSchema
var OrderItemSchema = new Schema({
  order_id: String,
  title: String,
  price: Number,
  num: Number
});

module.exports = mongoose.model('OrderItem', OrderItemSchema, 'order_item');
