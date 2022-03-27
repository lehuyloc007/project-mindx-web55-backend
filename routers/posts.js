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

router.post("/bookmark", authMdw, async (req, res) => {
    try {
        const getListPostByListBookmark = await postsCtrl.getListPostByListBookmark(req.body);
        res.json(messageCode(0, getListPostByListBookmark));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.get("/toplike", async (req, res) => {
    try {
        const getTopLike = await postsCtrl.getTopLike();
        res.json(messageCode(0, getTopLike));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.get("/search", async (req, res) => {
    try {
        const getListSearch = await postsCtrl.getListSearchWithPage(req.query);
        res.json(messageCode(0, getListSearch));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.get("/searchtype2", async (req, res) => {
    try {
        const getListSearch = await postsCtrl.getListSearchType1(req.query);
        res.json(messageCode(0, getListSearch));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

router.get("/detail", async (req, res) => {
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
router.patch("/update", authMdw, async (req, res) => {
    try {
        const updatePost = await postsCtrl.update(req.body)
        res.json(messageCode(0, updatePost));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.patch("/like",authMdw, async (req, res) => {
    try {
        const updatePost = await postsCtrl.likePost(req.body)
        res.json(messageCode(0, updatePost));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;