const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubSubPethosSchema = new Schema({
    subPethosID:{ type:mongoose.Schema.ObjectId,require, ref:'SubPethos'},
    title: { type: String, required: true },
    image: { type: String},
});
module.exports = mongoose.model('SubSubPethos', SubSubPethosSchema);