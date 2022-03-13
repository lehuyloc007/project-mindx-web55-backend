const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    lstBreakfast: {
        type: String
    },
    lstLunch: {
        type: String
    },
    lstDinner: {
        type: String
    }
}, {timestamps: true, versionKey: false});
const timeTablesModel = mongoose.model("TimeTables", shema);
module.exports = timeTablesModel;