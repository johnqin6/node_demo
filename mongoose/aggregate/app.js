var OrderModel = require('./models/order');

// OrderModel.find({}, function(err, doc) {
//   if (err) console.log(err);
//   console.log(doc);
// })

OrderModel.aggregate([
  {
    $lookup: {
      from: 'order_item',
      localField: 'order_id',
      foreignField: 'order_id',
      as: 'items'
    }
  }, {
    $match: { 'all_price': {$gte: 90} }
  }
], function(err, docs) {
  if (err) console.log(err);
  console.log(JSON.stringify(docs));
})