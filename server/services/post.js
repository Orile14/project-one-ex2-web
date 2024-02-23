const  Post = require ('../models/post')

const createPost = async (ownerID, content, img, date, comments, likes) => {
    const post = new Post({ ownerID, content, img, date, comments, likes })
    return await post.save(); 
}

module.exports = { createPost }