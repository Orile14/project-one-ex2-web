const  Post = require ('../models/post')

const createPost = async (ownerID, content, img, date, comments, likes) => {
    const post = new Post({ ownerID, content, img, date, comments, likes })
    return await post.save(); 
}
const getPostById = async (id) => {
    return await Post.findById(id);
}

const getPosts = async () => {
    return await Post.find({}); 
}

const updatePost = async(id,content) => {
    const post = await getPostById(id)
    if(!post) return null
        post.content = content
        await post.save();
        return post
}

const deletePost = async (id) =>{
    const post = await getPostById(id)
    if(!post) return Error("No such post")
    post.content = content
    await post.deleteOne();
    return post;
}

module.exports = { createPost , getPosts, getPostById,updatePost }