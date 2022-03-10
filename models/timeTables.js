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
    },
    status: {
        type: Number,
        default: 0
    }
}, {timestamps: true});
const timeTablesModel = mongoose.model("TimeTables", shema);
module.exports = timeTablesModel;