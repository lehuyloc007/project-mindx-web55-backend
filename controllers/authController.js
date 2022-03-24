const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findUserByEmail, findUserById } = require("../common/user");
const usersModel = require("../models/usersModel");
const sendEmail = require("../common/sendEmail");

const login = async (email, password) => {
    const existedUser = await findUserByEmail(email);
    if (!existedUser) {
        throw new Error("Email is not existed")
    }
    if (!verifyPassword(password, existedUser)) {
        throw new Error("Password not correct")
    }
    if (existedUser.verifiEmail == false) {
        throw new Error("Email is not verify")
    }
    const token = jwt.sign({
        _id: existedUser._id
    }, "MY_PRIiVATE_KEY", {
        expiresIn: 30 * 24 * 60 * 60
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
    if (existedUser) {
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
        expiresIn: 3 * 24 * 60 * 60
    })
    const content = `<div style="padding: 2rem 0;background-color: #003375">
        <div style="/* padding: 2rem 0; */background-color: white;text-align: center;width: 50%;margin: 0 auto;">
            <h1 style="color: #0085ff;border-bottom: 1px solid #bdbdbd;padding: 1rem 0;margin: 0;">COOKING HOLICS</h1>
            <h2 style="color: #5b5b5b;margin-top: 3rem;">Tạo tài khoản thành công !</h2>
            <p style="color: #333;font-size: 0.8rem;">Cảm ơn bạn đã đăng ký tài khoản Cooking Holics. Vui lòng bấm "xác nhận" để hoàn tất quá trình đăng ký</p>
            <a href="https://cooking-holics-backend.herokuapp.com/auth/verifiemail?tk=${token}" style="display: inline-block; padding: 0.25rem 0.75rem; margin-top: 1rem; margin-bottom: 3rem; background: #15c; color: #fff; font-size: 1rem; font-weight: 600; text-decoration: none; border-radius: 0.5rem;">Xác nhận</a>
        </div>
    </div>`;
    await sendEmail(content, insertedUser.email);

    return {
        infoUser: {
            _id: insertedUser._id
        }
    }
}
const changePassword = async (result) => {
    const existedUser = await findUserById(result.userId);
    if (!existedUser) {
        throw new Error("User does not exist")
    }
    if (!result.password === existedUser.password) {
        throw new Error("Old password doesn't match")
    }
    const { salt, hashedPassword } = encryptPassword(result.passwordNew);
    result.salt = salt;
    result.hashedPassword = hashedPassword;
    const updateUser = await usersModel.findOneAndUpdate({ _id: existedUser._id },
        {
            password: result.passwordNew,
            salt: result.salt,
            hashedPassword: result.hashedPassword
        },
        { new: true })
    return  {
        infoUser: {
            _id: updateUser._id
        }
    }
}

const verifiEmail = async (info) => {
    if (!info.tk) {
        throw new Error("No tocken")
    }
    let emailResult = {};
    jwt.verify(info.tk, "EMAIL_KEY", async (err, decodedInfo) => {
        if (err) {
            emailResult.err = err
        } else {
            emailResult._id = decodedInfo._id
        }
    })
    if (emailResult.err) {
        throw new Error("Invalid token");
    }
    const updateUser = await usersModel.findOneAndUpdate({ _id: emailResult._id }, { verifiEmail: true }, { new: true })
    return updateUser
}

const encryptPassword = (password) => {
    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString("hex");
    return {
        salt: salt,
        hashedPassword: hashedPassword
    }
}
const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString("hex");
    return hashedPassword == user.hashedPassword;
}
module.exports = { register, login, verifiEmail, changePassword }