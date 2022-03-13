const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const postsRouter = require("./posts");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/posts", postsRouter);

module.exports = router;