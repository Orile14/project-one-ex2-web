const User = require('../models/user')

const createUser = async (username, nick, password, img) => {
    const user = new User({ username, nick, password, img })
    return await user.save();
}

const authUser = async (username, password) => {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return null or appropriate response
    if (!user) {
        return null;
    }

    // If passwords match, return the user, otherwise return null
    return password == user.password ? true : false
};


module.exports = { createUser, authUser }