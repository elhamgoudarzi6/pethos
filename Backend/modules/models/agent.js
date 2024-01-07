const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const AgentSchema = new Schema({
    pethosID:{ type:mongoose.Schema.ObjectId,require, ref:'Pethos'},
    subPethosID:{ type:mongoose.Schema.ObjectId,require, ref:'SubPethos'},
    subSubPethosID:{ type:mongoose.Schema.ObjectId,require, ref:'SubSubPethos'},
    subPropertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'SubPropertyType'},
    levelID: { type:mongoose.Schema.ObjectId,require, ref:'AgentLevel'},
    fullName: { type: String,default:''},
    password:{ type: String,required: true },
    image: { type: String,default:''},
    mobile:  { type: String,default:''},
    userName:{ type: String,required: true },
    info: { type: String,default:''}, 
    active:{ type: Boolean,default:true},
    token:{type:String},
    type:{type:String,default:'agent'},
},{toJSON:{virtuals:true}});
AgentSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
AgentSchema.virtual('Pethos',{
    ref:'Pethos',
    localField:'pethosID',
    foreignField:'_id',
});
AgentSchema.virtual('SubPethos',{
    ref:'SubPethos',
    localField:'subPethosID',
    foreignField:'_id',
});
AgentSchema.virtual('SubSubPethos',{
    ref:'SubSubPethos',
    localField:'subSubPethosID',
    foreignField:'_id',
});
AgentSchema.virtual('SubPropertyType',{
    ref:'SubPropertyType',
    localField:'subPropertyTypeID',
    foreignField:'_id',
});
AgentSchema.virtual('AgentLevel',{
    ref:'AgentLevel',
    localField:'levelID',
    foreignField:'_id',
});
module.exports = mongoose.model('Agent', AgentSchema);