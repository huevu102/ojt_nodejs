const mongodb = require('../info/mongodb')
const User = require('../models/user-model')
const express = require('express')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

module.exports = {
    getAllUsers: async function() {
        const users = await User.find({})
        return users
    },
    createUser: async function(req, res) {
        await mongodb.waitForDbConnection();

        const userData = req.body;
        const user = new User(userData)

        user.save()
            .then(() => res.redirect('/sign-in'))
    },
    updateUser: async function(req, res) {
        await mongodb.waitForDbConnection();

        await User.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        )
        .then(() => res.redirect('/users-mgmt'))
    },
    deleteUser: async function(req, res, next) {
        await mongodb.waitForDbConnection();

        await User.deleteOne({_id: req.params.id})
        // .then(() => res.redirect('/users-mgmt')) //tai sao khong chay??
    }
}
