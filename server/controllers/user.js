const userService = require('../services/user');

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username, req.body.nick, req.body.password, req.body.img))
};

const authUser = async (req, res) => {
    res.json(await userService.authUser(req.body.username, req.body.password))
};

module.exports = { createUser, authUser }