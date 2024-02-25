const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({ 
    ownerID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    img: {
        type: String, 
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [String],
        requied: false
    },
    likes: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Post', Post);