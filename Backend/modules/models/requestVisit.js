const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const requestVisitSchema = new Schema({
    agentID: { type:mongoose.Schema.ObjectId,require, ref:'Agent'},
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    propertyID:{ type:mongoose.Schema.ObjectId,require, ref:'Property'},
    date: { type: String},
    time: { type: String},
    dateVisit:{ type: String,default:''},
    timeVisit:{ type: String,default:''},
    status:[{date:String,time:String,status:String}],
},{toJSON:{virtuals:true}});
requestVisitSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
requestVisitSchema.virtual('Property',{
    ref:'Property',
    localField:'propertyID',
    foreignField:'_id',
});
requestVisitSchema.virtual('Agent',{
    ref:'Agent',
    localField:'agentID',
    foreignField:'_id',
});
module.exports = mongoose.model('requestVisit', requestVisitSchema);
