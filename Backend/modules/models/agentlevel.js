const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AgentLevelSchema = new Schema({
    level:{type:Number,required: true },
    min:{type:Number, required: true },
    max:{type:Number , required: true },
});
module.exports = mongoose.model('AgentLevel', AgentLevelSchema);