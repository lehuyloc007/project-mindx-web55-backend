const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});
const commentsModel = mongoose.model("Comments", shema);
module.exports = commentsModel;