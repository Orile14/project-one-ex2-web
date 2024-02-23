const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Like = new Schema({
    ownerID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Like', Like);