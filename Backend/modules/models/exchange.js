const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExchangeSchema = new Schema({
    title: { type: String},
});
module.exports = mongoose.model('Exchange', ExchangeSchema);
