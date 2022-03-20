const express = require("express");
const router = express.Router();

const {authMdw} = require("../middlewares/auth");
const userCtrl = require("../controllers/userController")
const messageCode = require("../common/messageCode");

router.get("/info", authMdw, async (req, res) => {
    try {
        const infoUser = await userCtrl.infoUser(req.body);
        res.json(messageCode(0, infoUser));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.patch("/update", authMdw, async (req, res) => {
    try {
        const updateUser = await userCtrl.update(req.body);
        res.json(messageCode(0, updateUser));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
module.exports = router;
