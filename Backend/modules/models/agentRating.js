const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AgentRatingSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    agentID:{ type:mongoose.Schema.ObjectId,require, ref:'Agent'},
    rating: { type: Number },
},{timestamps:true,toJSON:{virtuals:true}});
AgentRatingSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
AgentRatingSchema.virtual('Agent',{
    ref:'Agent',
    localField:'agentID',
    foreignField:'_id',
});
module.exports = mongoose.model('AgentRating', AgentRatingSchema);

