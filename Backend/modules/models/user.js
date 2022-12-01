const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    mobile: { type: String, required: true },
    fullName: { type: String, default:''},
    birthDate:{type:String, default:''},
	rating: { type: Number,default:0},
    walletValue: { type: Number,default:0},
    image:{type:String, default:''},
    level:{type:String,default:'عادی'},
    type:{type:String,default:'user'},
    token:{type:String},
});
module.exports = mongoose.model('User', UserSchema);
