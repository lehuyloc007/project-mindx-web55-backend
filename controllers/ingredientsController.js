const usersModel = require("../models/usersModel");

const create = async (result) => {
    const insertedUser = new usersModel(result);
    await insertedUser.save()
    return {
        infoUser: {
            _id: existedUser._id,
            nameDisplay: existedUser.nameDisplay,
            email: existedUser.email,
            photoUrl: existedUser.photoUrl,
            listBookmark: existedUser.listBookmark,
        }
    }
}