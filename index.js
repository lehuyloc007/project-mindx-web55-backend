const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routers");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.DATABASE_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
)
app.use("/", router);
app.use("/assets", express.static('assets'));


mongoose.connect(URI).then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log("app is running at" + PORT)
    })
}).catch((err) => {
    console.log('err', err)
});

