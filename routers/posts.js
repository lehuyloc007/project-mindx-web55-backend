const express = require("express");
const router = express.Router();

const {authMdw} = require("../middlewares/auth");
const postsCtrl = require("../controllers/postsController");
const messageCode = require("../common/messageCode");

router.get("/", async (req, res) => {
    try {
        const getPosts = await postsCtrl.getListPostWithPage(req.query)
        res.json(messageCode(0, getPosts));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.post("/create",authMdw, async (req, res) => {
    try {
        const createPost = await postsCtrl.create(req.body)
        res.json(messageCode(0, createPost));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.post("/update", async (req, res) => {
    try {
        res.json(messageCode(0, "dsd"));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;