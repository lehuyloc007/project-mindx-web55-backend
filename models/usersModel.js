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
        type: String,
        default: ""
    },
    listBookmark: {
        type: Array,
        default: []
    },
    verifiEmail: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});
const usersModel = mongoose.model("Users", shema);
module.exports = usersModel;