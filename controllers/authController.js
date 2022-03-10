const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("../common/auth");
const userModel = require("../models/usersModel");

const login = async (email, password) => {
    const existedUser = await findByEmail(email);
    if(!existedUser) {
        throw new Error("Email is not existed!")
    }
    if(!verifyPassword(password, existedUser)) {
        throw new Error("Password not correct")
    }
    const token = jwt.sign({
        userId: existedUser._id
    }, "MY_PRIiVATE_KEY", {
        expiresIn: 60*60
    })
    return {
        existedUser: {
            _id: existedUser._id,
            nameDisplay: existedUser.nameDisplay,
            email: existedUser.email,
            photoUrl: existedUser.photoUrl,
            listBookmark: existedUser.listBookmark,
        },
        tocken: token
    }
}

const register = async (result) => {
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