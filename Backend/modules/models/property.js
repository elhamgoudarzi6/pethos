const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PropertySchema = new Schema({
    userID:{ type:mongoose.Schema.ObjectId,require, ref:'User'},
    propertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'PropertyType'},
    subPropertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'SubPropertyType'},
    discountID:{ type:mongoose.Schema.ObjectId,ref:'Discount'},
    transactionTypeID:{type:mongoose.Schema.ObjectId,require, ref:'TransanctionType'},
    agentID: { type:mongoose.Schema.ObjectId, ref:'Agent'},
    agentConfirm:{type:Boolean,default:false},
    code: { type: String},
    title: { type: String},
    age:{ type: Number},
    priceType: { type: String},
    bedroom: { type: Number},
    bath:  { type: Number},
    priceRent: { type: Number},
    priceMortgage:{type: Number},
    price: { type: Number},
    priority: { type: Number,default:1},
    area: { type: Number},
    detail: { type: String },
    location: [{ lat:String,lng:String }],
    features: { type: Array},
    address: { type: String },
    image: { type: String },
    state: { type: String },
    city: { type: String },
    gallery:{type:Array},
    exchange:{type:Array},
    condition:{type:Array},
    vr:{type:Array},
    date: { type: String},
    time: { type: String},
    active:{type:Boolean,default:false},
    keywords:{type:String},
    imageDescription:{type:String},
    metaDescription:{type:String},
},{timestamps:true,toJSON:{virtuals:true}});
PropertySchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
PropertySchema.virtual('Discount',{
    ref:'Discount',
    localField:'discountID',
    foreignField:'_id',
});
PropertySchema.virtual('SubPropertyType',{
    ref:'SubPropertyType',
    localField:'subPropertyTypeID',
    foreignField:'_id',
});
PropertySchema.virtual('PropertyType',{
    ref:'PropertyType',
    localField:'propertyTypeID',
    foreignField:'_id',
});
PropertySchema.virtual('TransactionType',{
    ref:'TransactionType',
    localField:'transactionTypeID',
    foreignField:'_id',
});
PropertySchema.virtual('Agent',{
    ref:'Agent',
    localField:'agentID',
    foreignField:'_id',
});
module.exports = mongoose.model('Property', PropertySchema);
