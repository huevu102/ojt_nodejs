const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: String //khong luu truc tiep password, dung salt de tang bao mat
})

const User = mongoose.model('User', userSchema);

module.exports = User