const postService = require('../services/post');

const createPost = async (req, res) => {
    res.json(await postService.createPost(req.body.ownerID, req.body.content, req.body.image,
                                          req.body.date, req.body.comments, req.body.likes ))
};

const getPosts = async (req, res) => {
    res.json(await postService.getPosts());
};

module.exports = { createPost, getPosts }