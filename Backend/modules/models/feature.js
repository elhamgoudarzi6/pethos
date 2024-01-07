const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FeatureSchema = new Schema({
    title: { type: String, required: true },
});
module.exports = mongoose.model('Feature', FeatureSchema);
