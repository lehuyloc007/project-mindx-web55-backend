const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const timeTablesRouter = require("./timeTables");
const uploadRouter = require("./upload")


const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/timetables", timeTablesRouter);
router.use("/upload", uploadRouter);


module.exports = router;