const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    agentID: { type:mongoose.Schema.ObjectId,require, ref:'Agent'},
    ticketNumber: { type: String},
    date: { type: String},
    time: { type: String},
   title: { type: String},
   detail:[{message:String,date:String,time:String,from:String,to:String}],
},{toJSON:{virtuals:true}});
TicketSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
TicketSchema.virtual('Agent',{
    ref:'Agent',
    localField:'agentID',
    foreignField:'_id',
});

module.exports = mongoose.model('Ticket', TicketSchema);
