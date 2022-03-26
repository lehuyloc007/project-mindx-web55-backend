const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    breakfast: {
        type: Array,
        default: []
    },
    lunch: {
        type: Array,
        default: []
    },
    dinner: {
        type: Array,
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