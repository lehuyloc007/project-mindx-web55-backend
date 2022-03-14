const express = require("express");
const router = express.Router();

const {authMdw} = require("../middlewares/auth");
const commentCtrl = require("../controllers/commemtsController");
const messageCode = require("../common/messageCode");

router.get("/", async (req, res) => {
    try {
        const getComments = await commentCtrl.getListCommentByIdPost(req.query)
        res.json(messageCode(0, getComments));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.post("/create",authMdw, async (req, res) => {
    try {
        req.body.userId = req.userId;
        const createComment = await commentCtrl.create(req.body)
        res.json(messageCode(0, createComment));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.patch("/update",authMdw, async (req, res) => {
    try {
        req.body.userId = req.userId;
        const updateComment = await commentCtrl.update(req.body)
        res.json(messageCode(0, updateComment));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;