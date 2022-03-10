const create = async (result) => {
    const existedUser = await findByEmail(result.email)
    if(existedUser) {
        throw new Error("Email is existed!")
    }
    const { salt, hashedPassword } = encryptPassword(result.password);
    result.salt = salt;
    result.hashedPassword = hashedPassword;
    const insertedUser = new userModel(result);
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
module.exports = { create }