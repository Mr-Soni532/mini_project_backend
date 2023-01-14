// authenticating the user
const JWT = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        res.status(400).send({ error: "Login required!" })
    }
    try {
        const data = JWT.verify(token, JWT_SECRET);
        req.userId = data;
        next();
    } catch (error) {
        res.status(401).send({ error: "Login required!" })
    }
}
module.exports = authenticate;