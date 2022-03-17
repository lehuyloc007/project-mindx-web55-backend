const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    titleAlias: {
        type: String,
        default: ""
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
    ingredients: {
        type: [
            {
                nameIngredient: {
                    type: String,
                    required: true
                },
                total: {
                    type: Number,
                    required: true
                },
                _id : false
            }
        ],
        default: []
    },
    totalCalories: {
        type: Number,
        default: 0
    },
    usersLike: {
        type: Array,
        default: []
    }
}, {timestamps: true, versionKey: false});
const postsModel = mongoose.model("Posts", shema);
module.exports = postsModel;