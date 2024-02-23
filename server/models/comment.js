const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: date,
        default: Date.now()
    },
    likes: {
        type: [Like],
        required: false
    }
});


module.exports = mongoose.model('Comment', Comment);