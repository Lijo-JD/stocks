require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const connection = require('../../db').promise();

router.get("/", (req, res, next) => {
    res.redirect("/");
})

router.post('/', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const response = await connection.execute("SELECT `iduserlogin` FROM `" + process.env.DB + "`.`userlogin` WHERE `username` = ? AND `password` = ?", [username, password]);
    if(response[0] && response[0].length > 0) {
        const token = jwt.sign({userid: response[0][0].iduserlogin}, process.env.SECRET_KEY, {expiresIn: '10h'});
        res.status(200).json({message: "Successfull", token: token})
    } else {
        res.status(404).json({message: "Username or Password is invalid"})
    }
})

module.exports = router;