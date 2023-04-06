const mongodb = require('../info/mongodb')
const User = require('../models/users')

module.exports = {
    getAllUsers: async function() {
        const users = await User.find({})
        return users
    },
    createUser: async function(req, res) {
        await mongodb.waitForDbConnection();

        const user = new User({
            name: req.body.userName,
            email: req.body.userEmail,
            password: req.body.userPassword,
            salt: Date.now()
        })

        return user.save()
    },
    updateUser: async function(req, res) {
        await mongodb.waitForDbConnection();

        
    },
    deleteUser: async function(req, res) {
        await mongodb.waitForDbConnection();

        
    }
}
