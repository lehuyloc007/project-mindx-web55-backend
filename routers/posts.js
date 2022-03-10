const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
       
        res.json(messageCode(0, loggedUsers));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});
router.post("/create", async (req, res) => {
    try {
       
        res.json(messageCode(0, newUser));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
});

module.exports = router;