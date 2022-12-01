const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PethosSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
PethosSchema.virtual('SubPethos',{
    ref:'SubPethos',
    localField:'_id',
    foreignField:'pethosID',
});
module.exports = mongoose.model('Pethos', PethosSchema);
