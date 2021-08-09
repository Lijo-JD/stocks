require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const connection = require('../../db').promise();
const authenticateToken = require('../../verifyToken');

router.get('/stock_name', authenticateToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, verified) => {
        if(error) {
            res.status(403).json({message: "Invalid token"});
        } else {
            const response = await connection.execute("SELECT `SNo`, `Name` FROM `" + process.env.DB + "`.`stocks_info`")
            res.status(200).json({message: "Successfully selected", result: response[0]});
        }
    })
})

router.post('/get_stock', authenticateToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, verified) => {
        if(error) {
            res.status(403).json({message: "Invalid token"})
        } else {
            const response = await connection.execute("SELECT * FROM `" + process.env.DB + "`.`stocks_info` WHERE `SNo` = ?", [req.body.id])
            res.status(200).json({message: "Successfully selected", result: response[0]});
        }
    })
})

module.exports = router;