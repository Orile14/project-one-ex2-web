const articleService = require('../services/article');

const createArticle = async (req, res) => {
    res.json(await articleService.createArticle(req.body.title))
};

module.exports = { createArticle }