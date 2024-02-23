const postService = require('../services/post');

const createPost = async (req, res) => {
    res.json(await postService.createUser(req.body.ownerID, req.body.content, req.body.image))
};


module.exports = { createPost }