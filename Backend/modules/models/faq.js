const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FaqSchema = new Schema({
    question: { type: String},
	reply:{ type: String},
	category:{ type: String},
});
module.exports = mongoose.model('Faq', FaqSchema);