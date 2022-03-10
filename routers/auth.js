const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/authController");
const messageCode = require("../common/messageCode");

router.post("/login", async (req, res) => {
    try {
        const loggedUsers = await AuthCtrl.login(req.body.email, req.body.password);
        res.json(messageCode(0, loggedUsers));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.post("/register", async (req, res) => {
    try {
        const newUser = await AuthCtrl.register(req.body);
        res.json(messageCode(0, newUser));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;