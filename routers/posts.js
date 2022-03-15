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
router.get("/detail",authMdw, async (req, res) => {
    try {
        const getDetailPostById = await postsCtrl.getDetailPostById(req.query)
        res.json(messageCode(0, getDetailPostById));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.get("/user",authMdw, async (req, res) => {
    try {
        const getPostUser = await postsCtrl.getListPostUserWithPage(req.query)
        res.json(messageCode(0, getPostUser));
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
router.patch("/update",authMdw, async (req, res) => {
    try {
        const updatePost = await postsCtrl.update(req.body)
        res.json(messageCode(0, updatePost));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;