const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    }
}, {timestamps: true, versionKey: false});
const timeTablesModel = mongoose.model("TimeTables", shema);
module.exports = timeTablesModel;