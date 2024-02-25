const userService = require('../services/user');

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username, req.body.nick, req.body.password, req.body.img))
};

const authUser = async (req, res) => {
    res.json(await userService.authUser(req.body.username, req.body.password))
};

function isLogedIn(req,res,next){
    if(req.session.username!=null){
        return next();
    }else{
        res.redirect('/')
    }
}

module.exports = { createUser, authUser,isLogedIn }