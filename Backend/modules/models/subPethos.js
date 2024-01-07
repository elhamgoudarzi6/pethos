const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubPethosSchema = new Schema({
    pethosID:{ type:mongoose.Schema.ObjectId,require, ref:'Pethos'},
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
SubPethosSchema.virtual('SubSubPethos',{
    ref:'SubSubPethos',
    localField:'_id',
    foreignField:'subPethosID',
});
module.exports = mongoose.model('SubPethos', SubPethosSchema);
