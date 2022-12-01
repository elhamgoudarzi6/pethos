const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConditionSchema = new Schema({
    title: { type: String, required: true },
});
module.exports = mongoose.model('Condition', ConditionSchema);
