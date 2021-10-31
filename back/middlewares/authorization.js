const {User} = require("../models");
const jwt = require('jsonwebtoken');


const EXCLUDE = [
    ['/api/login', ['POST', 'GET']],
    ['/api/register', ['POST', 'GET']],
    ['/api/logout', ['POST', 'GET']],
];

const authorization = async (req, res, next) => {
    try {
        const {path, method} = req;
        for (let i = 0; i < EXCLUDE.length; i++) {
            if ((EXCLUDE[i][0] === path && EXCLUDE[i][1].includes(method)) || method === 'OPTIONS') {
                next();
                return;
            }
        }
        const token = req.header("Authorization");

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET)
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

        req.body.user = await User.findByPk(decoded.id)
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = authorization;
