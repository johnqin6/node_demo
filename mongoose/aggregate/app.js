var OrderModel = require('./models/order');
var ArticleModel = require('./models/article');

// OrderModel.find({}, function(err, doc) {
//   if (err) console.log(err);
//   console.log(doc);
// })

// OrderModel.aggregate([
//   {
//     $lookup: {
//       from: 'order_item',
//       localField: 'order_id',
//       foreignField: 'order_id',
//       as: 'items'
//     }
//   }, {
//     $match: { 'all_price': {$gte: 90} }
//   }
// ], function(err, docs) {
//   if (err) console.log(err);
//   console.log(JSON.stringify(docs));
// })

ArticleModel.aggregate([
  {
    $lookup: {  // 连接操作符
      from: 'articlecate',  // 关联的集合
      localField: 'cid',   // 本集合关联的字段
      foreignField: '_id',  // 其他集合关联的字段
      as: 'cate'   // 输出的字段
    }
  },
  {
    $lookup: {  // 连接操作符
      from: 'user',  // 关联的集合
      localField: 'author_id',   // 本集合关联的字段
      foreignField: '_id',  // 其他集合关联的字段
      as: 'user'   // 输出的字段
    }
  },
], function(err, docs) {
  if (err) console.log(err)
  console.log(JSON.stringify(docs));
})