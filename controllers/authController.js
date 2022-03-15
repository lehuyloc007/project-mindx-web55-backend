const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../common/user");
const usersModel = require("../models/usersModel");
const sendEmail = require("../common/sendEmail");

const login = async (email, password) => {
    const existedUser = await findUserByEmail(email);
    if(!existedUser) {
        throw new Error("Email is not existed")
    }
    if(!verifyPassword(password, existedUser)) {
        throw new Error("Password not correct")
    }
    if(existedUser.verifiEmail == false) {
        throw new Error("Email is not verify")
    }
    const token = jwt.sign({
        _id: existedUser._id
    }, "MY_PRIiVATE_KEY", {
        expiresIn: 30*24*60*60
    })
    return {
        // _id: existedUser._id,
        // nameDisplay: existedUser.nameDisplay,
        // email: existedUser.email,
        // photoUrl: existedUser.photoUrl,
        // listBookmark: existedUser.listBookmark,
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
    await insertedUser.save();

    const token = jwt.sign({
        _id: insertedUser._id
    }, "EMAIL_KEY", {
        expiresIn: 3*24*60*60
    })
    const content = `<div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #0085ff">Tạo tài khoản thành công</h4>
            <p style="color: black">Vui lòng bấm vào <a href="http://localhost:5001/auth/verifiemail?tk=${token}">Link</a> để hoàn tất đăng ký </p>
        </div>
    </div>`;
    sendEmail(content, result.email);
    return {
        infoUser: {
            _id: insertedUser._id
            // nameDisplay: existedUser.nameDisplay,
            // email: existedUser.email,
            // photoUrl: existedUser.photoUrl,
            // listBookmark: existedUser.listBookmark,
        }
    }
}

const verifiEmail = async (info) => {
    if(!info.tk) {
        throw new Error("No tocken")
    }
    let emailResult = {};
    jwt.verify(info.tk, "EMAIL_KEY", async (err, decodedInfo) => {
        if(err) {
            emailResult.err = err
        } else {
            emailResult._id = decodedInfo._id
        }
    })
    if(emailResult.err) {
        throw new Error("Invalid token")
    }
    const updateUser = await usersModel.findOneAndUpdate({_id: emailResult._id}, {verifiEmail: true}, {new: true})
    return updateUser
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
module.exports = { register, login, verifiEmail }