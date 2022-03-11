const usersModel = require("../models/usersModel");

const update = async (info) => {
   const updateUser = await usersModel.findOneAndUpdate({_id: info._id}, info, {new: true})
    return {
        _id: updateUser._id,
        nameDisplay: updateUser.nameDisplay,
        email: updateUser.email,
        photoUrl: updateUser.photoUrl,
        listBookmark: updateUser.listBookmark,
    }
}

module.exports = { update }