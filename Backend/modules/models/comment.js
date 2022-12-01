const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    propertyID:{ type:Schema.Types.ObjectId,require, ref:'Property'},
    commentText: { type: String},
	reply:{ type: String},
    active:{type:Boolean,default:false}
},{toJSON:{virtuals:true}});
CommentSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
module.exports = mongoose.model('Comment', CommentSchema);