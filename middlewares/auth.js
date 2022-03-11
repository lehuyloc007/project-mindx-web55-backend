const jwt = require("jsonwebtoken");
const authMdw = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        res.status(401).send("Missing JWT tocken")
    }
    const token = bearerToken.split(" ")[1];
    
    jwt.verify(token, "MY_PRIiVATE_KEY", async (err, decodedInfo) => {
        if(err) {
            res.status(401).send("Invalid token");
        } else {
            next();
        }
    })
}
module.exports = { authMdw };