const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../common/user");
const usersModel = require("../models/usersModel");

const login = async (email, password) => {
    const existedUser = await findUserByEmail(email);
    if(!existedUser) {
        throw new Error("Email is not existed!")
    }
    if(!verifyPassword(password, existedUser)) {
        throw new Error("Password not correct")
    }
    const token = jwt.sign({
        _id: existedUser._id
    }, "MY_PRIiVATE_KEY", {
        expiresIn: 30*24*60*60
    })
    return {
        _id: existedUser._id,
        nameDisplay: existedUser.nameDisplay,
        email: existedUser.email,
        photoUrl: existedUser.photoUrl,
        listBookmark: existedUser.listBookmark,
        tocken: token
    }
}

const register = async (result) => {
    const existedUser = await findUserByEmail(result.email)
    if(existedUser) {
        throw new Error("Email is existed!")
    }
    const { salt, hashedPassword } = encryptPassword(result.password);
    result.salt = salt;
    result.hashedPassword = hashedPassword;
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
const encryptPassword = (password) => {
    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000 , 64, 'sha512').toString("hex");
    return {
        salt: salt,
        hashedPassword: hashedPassword
    }
}
const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString("hex");
    return hashedPassword == user.hashedPassword;
}
module.exports = { register, login }