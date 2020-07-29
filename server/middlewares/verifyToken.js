const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, "anythingiwant");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    };
};
module.exports = verifyToken;