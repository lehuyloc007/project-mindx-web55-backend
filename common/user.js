const usersModel = require("../models/usersModel");
const findByEmail = async (email) => {
    return await usersModel.findOne({
        email: email
    })
}
const findById = async (id) => {
    return await usersModel.findById({
        _id: id
    })
}
module.exports = { findByEmail, findById };