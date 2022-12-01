const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubscriptionSchema = new Schema({
    mobile: { type: String},
});
module.exports = mongoose.model('Subscription', SubscriptionSchema);