const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    breakfast: {
        type: [
            {
                postId: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                totalCalories:{
                    type: Number,
                    default: 0
                },
                _id : false
            }
        ],
        default: []
    },
    lunch: {
        type: [
            {
                postId: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                totalCalories:{
                    type: Number,
                    default: 0
                },
                _id : false
            }
        ],
        default: []
    },
    dinner: {
        type: [
            {
                postId: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                totalCalories:{
                    type: Number,
                    default: 0
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
    dateEat: {
        type: Date,
        required: true
    }
}, {timestamps: true, versionKey: false});
const timeTablesModel = mongoose.model("TimeTables", shema);
module.exports = timeTablesModel;