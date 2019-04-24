var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Modeling the document schema
//eg. document schema name = book
var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now }
});

//Collection will be plural type of document
//eg. collection name = books
module.exports = mongoose.model('book', bookSchema);
