const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    ingredientsId: {
        type: Array,
        default: []
    },
    totalCalories: {
        type: Number,
        default: 0
    },
    commentId: {
        type: String,
        required: true
    },
    likeList: {
        type: Array,
        default: []
    }
}, {timestamps: true});
const postsModel = mongoose.model("Posts", shema);
module.exports = postsModel;