const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubPropertyTypeSchema = new Schema({
    propertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'PropertyType'},
    title: { type: String, required: true },
    image: { type: String},
});
module.exports = mongoose.model('SubPropertyType', SubPropertyTypeSchema);
