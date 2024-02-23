const  Post = require ('../models/post')

const createPost = async (ownerID, content,img) => {

    const post = new Post({ ownerID,content,img })
    return await post.save(); 
}

module.exports = { createPost }