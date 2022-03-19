const express= require("express");
const multer = require("multer");
const path = require("path")
//const uploadFirebase = require("../common/upload");
//const messageCode = require("../common/messageCode");
const router = express.Router();

//const storage = multer.memoryStorage()
//const uploadMdw = multer({storage: storage});
// router.post("/", uploadMdw.array('myFile', 12), async (req, res) => {
//     try {
//         const upload = await uploadFirebase(req.files)
//         res.json(messageCode(0, upload));
//     } catch (err) {
//         res.status(409).json(messageCode(1, err.message));
//     }
// })

let uploadedFile = [];
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../assets"));
    },
    filename: function(req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        const fileName = suffix + '-' + file.originalname.replaceAll(' ', '-');
        uploadedFile.push("https://cooking-holics-backend.herokuapp.com/assets/"+ fileName);
        req.uploadedFile = uploadedFile;
        cb(null, fileName)
    }
})
const uploadMdw = multer({storage: storage});
router.post("/", uploadMdw.array('myFile', 12), (req, res) => {
    try {
        res.json(messageCode(0, req.uploadedFile));
    } catch (err) {
        res.status(409).json(messageCode(1, err.message));
    }
})


module.exports = router