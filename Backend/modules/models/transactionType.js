const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionTypeSchema = new Schema({
    title: { type: String}
});
module.exports = mongoose.model('TransactionType', TransactionTypeSchema);