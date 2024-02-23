const articleController = require('../controllers/article');

const express = require('express');
var router = express.Router();

router.route('/').post(articleController.createArticle);

module.exports = router;