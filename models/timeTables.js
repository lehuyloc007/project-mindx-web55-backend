const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    breakfast: {
        type: String,
        default: ""
    },
    lunch: {
        type: String,
        default: ""
    },
    dinner: {
        type: String,
        default: ""
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