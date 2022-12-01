const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SliderSchema = new Schema({
    imageurl: { type: String, required: true },
    link:{type:String,required:true},
    tag:{type:String}
})
module.exports = mongoose.model('Slider', SliderSchema);