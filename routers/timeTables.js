const express = require("express");
const router = express.Router();

const {authMdw} = require("../middlewares/auth");
const timeTablesCtrl = require("../controllers/timeTablesController");
const messageCode = require("../common/messageCode");

router.get("/", async (req, res) => {
    try {
        const getTimeTable = await timeTablesCtrl.getTimeTableByUserId(req.body)
        res.json(messageCode(0, getTimeTable));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.post("/create", async (req, res) => {
    try {
        const createTimeTable = await timeTablesCtrl.create(req.body)
        res.json(messageCode(0, createTimeTable));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.patch("/update",authMdw, async (req, res) => {
    try {
        const updateTimeTable = await timeTablesCtrl.update(req.body)
        res.json(messageCode(0, updateTimeTable));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;