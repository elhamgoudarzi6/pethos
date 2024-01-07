const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const AdminSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String,default:''},
    accessLevel:[{users:Boolean,agents:Boolean,property:Boolean,profile:Boolean}],
    image: { type: String,default:''},
    type:{type:String,default:'admin'},
    token:{type:String},
});
AdminSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('Admin', AdminSchema);
