const { findUserById } = require("../common/user");
const usersModel = require("../models/usersModel");


const infoUser = async (info) => {
   const infoUser = await findUserById(info.userId);
    return {
        _id: infoUser._id,
        nameDisplay: infoUser.nameDisplay,
        email: infoUser.email,
        photoUrl: infoUser.photoUrl,
        listBookmark: infoUser.listBookmark,
    }
}

const update = async (info) => {
   const updateUser = await usersModel.findOneAndUpdate({_id: info.userId}, info, {new: true})
    return {
        _id: updateUser._id,
        nameDisplay: updateUser.nameDisplay,
        email: updateUser.email,
        photoUrl: updateUser.photoUrl,
        listBookmark: updateUser.listBookmark,
    }
}

module.exports = { update, infoUser }