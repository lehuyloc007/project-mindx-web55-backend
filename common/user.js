const usersModel = require("../models/usersModel");
const findUserByEmail = async (email) => {
    return await usersModel.findOne({
        email: email
    })
}
const findUserById = async (id) => {
    return await usersModel.findById({
        _id: id
    })
}
module.exports = { findUserByEmail, findUserById };