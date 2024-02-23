const postController = require('../controllers/post');

const express = require('express');
var router = express.Router();

router.route('/add').post(postController.createPost);
router.route('/get').get(postController.getPosts);

module.exports = router;
