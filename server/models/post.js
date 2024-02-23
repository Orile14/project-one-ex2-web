const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    img: {
        type: String, 
        required: false
    },
    date: {
        type: date,
        default: Date.now()
    },
    comments: {
        type: [Comment],
        requied: false
    },
    likes: {
        type: [Like],
        required: false
    }
    
});

module.exports = mongoose.model('Post', Post);