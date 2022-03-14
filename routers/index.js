const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

module.exports = router;