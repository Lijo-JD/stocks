const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authToken = req.headers['authorization']
    const token = authToken && authToken.split(' ')[1];
    if(!token) {
        res.status(401).json({message: "No token found"})
    }
    req.token = token;
    next();
}

module.exports = authenticateToken;