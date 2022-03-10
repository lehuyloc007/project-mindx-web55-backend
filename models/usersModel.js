const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    nameDisplay: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String
    },
    listBookmark: {
        type: Array,
        default: []
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
}, {timestamps: true});
const userModel = mongoose.model("Users", shema);
module.exports = userModel;