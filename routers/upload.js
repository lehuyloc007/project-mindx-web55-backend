const express= require("express");
const multer = require("multer");
const path = require("path")
const router = express.Router();

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
     res.send(req.uploadedFile);
})
module.exports = router