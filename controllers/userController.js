const usersModel = require("../models/usersModel");

const update = async (info) => {
    if(!info.userId) {
        throw new Error("Update user don't have Id");
    }
   const updateUser = await usersModel.findOneAndUpdate({_id: info.userId}, info, {new: true})
    return {
        _id: updateUser._id,
        nameDisplay: updateUser.nameDisplay,
        email: updateUser.email,
        photoUrl: updateUser.photoUrl,
        listBookmark: updateUser.listBookmark,
    }
}

module.exports = { update }