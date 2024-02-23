const  Post = require ('../models/post')

const createPost = async (ownerID, content, img, date, comments, likes) => {
    const post = new Post({ ownerID, content, img, date, comments, likes })
    return await post.save(); 
}

const getPosts = async () => {
    return await Post.find({}); 
}

module.exports = { createPost, getPosts }