const postService = require('../services/post');

const createPost = async (req, res) => {
    res.json(await articleService.createArticle(req.body.title))
};

module.exports = { createPost }