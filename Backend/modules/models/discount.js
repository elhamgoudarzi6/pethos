const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiscountSchema = new Schema({
    discountTitle: { type: String},
    discountPercent:{type:Number},
    discountCode:{type:String}
});
module.exports = mongoose.model('Discount', DiscountSchema);