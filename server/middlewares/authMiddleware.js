const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).send({ success: false,message: "Access denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   
        req.user = {
            userid : decoded.userid
            }
        
        next();
    } catch (error) {
        res.status(500).send({ success: false,message: "Invalid token", error}); 
    }
}