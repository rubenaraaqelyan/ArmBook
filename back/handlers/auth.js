const {User} = require("../models/");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require('lodash')
const fs = require("fs");
const sharp = require("sharp");


const getUserData = async (req, res) => {
    try {

        const userData = await User.findByPk(req.body.user.id, {raw: true})

        res.json({
           user: userData,
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            where: {email}
        })
        if (!user) return res.status(400).json({msg: "Email or password is wrong"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: "Email or password is wrong"})

        const access_token = createAccessToken({id: user.id})
        const refresh_token = createRefreshToken({id: user.id})

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            msg: 'Login Success!',
            access_token,
            user,
        })
        console.log(access_token)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const register = async (req, res) => {
    try {

        const {firstName, lastName, email, password, gender} = req.body

        const user_email = await User.findOne({
            where: {email}
        })
        if (user_email) return res.status(400).json({msg: "This email already exists."})

        if (password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await User.create({
            firstName, lastName, email, password: passwordHash, gender
        })

        const access_token = createAccessToken({id: user.id})
        const refresh_token = createRefreshToken({id: user.id})

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.json({
            success: true,
            msg: 'Register Success!',
            access_token,
            user
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}

const logout = async (req, res) => {
    try {
        res.clearCookie('access_token', {path: '/api/refresh_token'})
        return res.json({msg: "Logged out!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const generateAccessToken = async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken
        if (!rf_token) return res.status(400).json({msg: "Please login now."})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
            if (err) return res.status(400).json({msg: "Please login now."})

            const user = await User.findByPk(result.id)

            if (user) return res.status(400).json({msg: "This does not exist."})

            const access_token = createAccessToken({id: result.id})

            res.json({
                access_token,
                user
            })
            console.log(access_token)
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}


module.exports = { login, register, logout, generateAccessToken, createAccessToken, createRefreshToken, getUserData };
