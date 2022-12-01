const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestPropertySchema = new Schema({
    transactionTypeID: { type:mongoose.Schema.ObjectId,require, ref:'TransactionTypeID'},
    propertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'PropertyType'},
    subPropertyTypeID:{ type:mongoose.Schema.ObjectId,require, ref:'SubPropertyType'},
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    keywords: { type: Array},
    priceMin: { type: Number},
    priceMax: { type: Number},
    ageMin: { type: Number},
    ageMax: { type: Number},
    bedroom: { type: Array},
    bath: { type: Array},
    priority: { type: Number},
    areaMin: { type: Number },
    areaMax: { type: Number },
    priceRentMax: { type: Number},
    priceRentMin: { type: Number},
    priceMortgageMax: { type: Number},
    priceMortgageMin: { type: Number},
    priceType:{ type: String },
    location: { type: String },
    features: { type: Array},
    state: { type: String },
    city: { type: String },
    exchange:{type:Array},
    condition:{type:Array},
    date: { type: String},
    time: { type: String},
    status:{ type: String,default:false}
},{toJSON:{virtuals:true}});
RequestPropertySchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
module.exports = mongoose.model('RequestProperty', RequestPropertySchema);
