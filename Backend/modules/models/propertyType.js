const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PropertyTypeSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
PropertyTypeSchema.virtual('SubPropertyType',{
    ref:'SubPropertyType',
    localField:'_id',
    foreignField:'propertyTypeID',
});
module.exports = mongoose.model('PropertyType', PropertyTypeSchema);
