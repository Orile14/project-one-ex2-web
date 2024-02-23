const  Post = require ('../models/post')

const createPost = async (ownerID, text,img,date,comments,likes) => {

    const post = new Post({ ownerID,text,img,date,comments,likes })
    return await post.save(); 
}

module.exports = { createPost }