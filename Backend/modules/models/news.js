const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    title: { type: String },
    brief: { type: String },
    details: { type: String },
    keywords: { type: String },
    image: { type: String },
    imageDescription: { type: String },
    date: { type: String},
    metaDescription: { type: String},
    tags:{ type: Array},

});
module.exports = mongoose.model('News', NewsSchema);
