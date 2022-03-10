const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
}, {timestamps: true});
const ingredientsModel = mongoose.model("Ingredients", shema);
module.exports = ingredientsModel;