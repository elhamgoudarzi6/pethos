const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FavoriteSchema = new Schema({
    propertyID:{ type:mongoose.Schema.ObjectId,require, ref:'Property'},
    userID:{ type:mongoose.Schema.ObjectId,require, ref:'User'},
},{toJSON:{virtuals:true}});
FavoriteSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
FavoriteSchema.virtual('Property',{
    ref:'Property',
    localField:'propertyID',
    foreignField:'_id',
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
