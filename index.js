const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use("/assets", express.static('assets'));

const port = process.env.PORT || 5001
mongoose.connect('mongodb+srv://admin:TyYwrMr3fkD0a7P7@cluster0.exdre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log('Connected to DB');
    app.listen(port, () => {
        console.log("app is running at" + port)
    })
}).catch((err) => {
    console.log('err', err)
});

