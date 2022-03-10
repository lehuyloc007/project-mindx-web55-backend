const userModel = require("../models/usersModel");
const findByEmail = async (email) => {
    return await userModel.findOne({
        email: email
    })
}
module.exports = { findByEmail };