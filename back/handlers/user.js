const { Op } = require("sequelize");
const { User, Post, Comment } = require('../models');
const { UserFollower, Like } = require("../models");
const _ = require('lodash');
const fs = require("fs");
const sharp = require("sharp");
const transporter = require("../config/nodemailer");
const { upload } = require('../middlewares/postImageUploadMiddleware');
const { v4: uuidv4 } = require('uuid');


const searchUser = async (req, res) => {
    const {user} = req.body;
    try {
        const users = await User.findAll({
            where: {
                firstName: {[Op.like]: `%${req.query.firstName}%`},
                id: {[Op.notIn]: [user.id]},
                },
            limit: 10,
            attributes: ['id', 'firstName', 'lastName', 'avatar']
        })
        res.json({users});
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: Post,
                as: "posts",
                include: [
                    {
                        model: Like,
                        as: 'likePost'
                    },
                    {
                        model: Comment,
                        as: 'commentPost',
                        include: [
                            { model: User, attributes: ["id", "email"] }
                        ]
                    }
                ],
            }
        })

        if (!user) return res.status(400).json({msg: "User does not exist."})

        res.json({user})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({where: req.user.id})

        if (!user) return res.status(400).json({msg: "User does not exist."})

        res.json(user)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {firstName, mobile, address, story, website, gender, imageUrl, user} = req.body;
        await User.update({
            firstName, mobile, address, story,
            website, gender, avatar: imageUrl ? global.serverUrl + "/" + imageUrl : user.avatar
        }, {
            where: {
                id: user.id
            },
        })

        const result = await User.findOne({
            where: {
                id: user.id
            }
        });

        res.json({msg: "Update Success!", user: result})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const addFriend = async (req, res) => {
    try {
        const {user} = req.body;
        const {id} = req.params;

        const friends = await UserFollower.findOne({where: {followerId: user.id, userId: id}})
        if (friends) {
            return res.status(500).json({
                msg: 'You already send friend request',
            })
        }

        const friend = await UserFollower.create({followerId: user.id, userId: Number(id)})

        res.json({
            msg:'ok',
            user: friend
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const cancelFriend = async (req, res) => {
    try {
        const {user} = req.body;
        const {id} = req.params;

        const friend = await UserFollower.destroy({
            where: {
                followerId: user.id, userId: Number(id)
            },
            limit: 1,
        })

        res.json({
            msg: 'destroy request!',
            friend,
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getOwnFollowingRequests = async (req, res) => {
    try {
        const {user} = req.body;

        const result = await UserFollower.findAll({
            where: {
                userId: +req.body.user.id,
                accepted: 0
            },
            include: {
                model: User,
                as: "followersUser"
            },
            raw: true,
        })

        res.json({result})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getFollowers = async (req, res) => {
    try {
        const {user} = req.body;

        const result = await User.findByPk(user.id, {
            attributes: [],
            include: {model: User, as: 'followers', where: {accepted: true}, through: {attributes: []}},
        })

        res.status(200).json({
            msg:'ok',
            result
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const acceptFollowingRequest = async (req, res) => {
    try {
        const {user, followerId} = req.body;

        await UserFollower.update({accepted: true}, {
            where: {followerId},
        })

        const result = UserFollower.findOne({
            where: {
                followerId
            }
        })

        res.status(200).json({
            msg:'ok',
            result
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const suggestionsUser = async (req, res) => {
    try {
        const {user} = req.body;

        const result = await UserFollower.findAll({
            where: {
                userId: user.id,
                accepted: false
            },
            include: {
                model: User,
                as: 'followersUser',
            },
        })

        res.json({result})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const denyFriendRequest = async (req, res) => {
    try {
        const {id} = req.params;

        const unFollow = await UserFollower.destroy({
            where: {
                followerId: id,
                userId: req.body.user.id
            },
            limit: 1,
        })

        res.json({
            unFollow,
            msg: 'Deleted'
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getFriends = async (req, res) => {
    try {
        const {user} = req.body;

        const result = await UserFollower.findAll({
            where: {
                userId: user.id,
                accepted: true
            },
            include: {
                model: User,
                as: 'followersUser',
            },
        })

        res.json({result})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getSendedFriends = async (req, res) => {
    try {
        const {user} = req.body;

        const result = await UserFollower.findAll({
            where: {
                followerId: user.id,
                accepted: false
            },
            include: {
                model: User,
                as: 'followersUser',
            },
        })

        res.json({result})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({
            where: {
                email,
            },
        });
        if (user) {
            const activationCode = uuidv4();
            await User.update({
                activation_code: activationCode,
                status: 'pending',
            }, {
                where: {
                    email,
                },
            });
            const confInfo = `
                <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
                    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;text-align: center;
                    background: black;color: #ba0101; margin-bottom: 20px;font-family: monospace;">ArmBook</div>
                    <h1 style="margin: 0 0 50px 0;text-align: center;">Բարի գալուստ մեր կայք</h1>
                    <strong style="margin: 0 0 10px 100px">Ողջու՜յն ${user} ${user}</strong>
                    <p style="word-break: break-word;margin: 0 0 50px 100px">
                    Վերջերս խնդրել եք վերականգնել Ձեր ArmBook հաշվի գաղտնաբառը։</p>
                    <a href="mailto:${email}" style="display:block;word-break: break-word;text-align: center;
                    margin: 0 0 30px 0">${email}</a>
                    <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
                    Ձեր գաղտնաբառը թարմացնելու համար սեղմեք ներքևի կոճակը։</p>
                    <a style="width: 150px;padding: 8px 20px;background: #3572b0;font-weight: bold;
                    text-align: center;color:white;margin: 0 auto 30px;display: block;
                    border-radius: 5px;word-break: break-word;text-decoration: none;"
                     href="${process.env.CONFIRM_URL + activationCode}">Հաստատեք Ձեր էլ․ Փոստը </a>
                     <i style="margin: 0 0 10px 100px;display: block">Հարգանքներով</i>
                     <strong style="margin: 0 0 0 100px">ArmBook Թիմ</strong>
                </div>
            `;
            await transporter.sendMail({
                from: '"ArmBook" <karsmanex.contact@mail.ru>',
                to: email,
                subject: 'ArmBook - Email Confirmation',
                text: `Բարեւ`,
                html: confInfo,
            });
            res.json({
                status: 'Ձեզ ուղարկվել է էլ․ նամակ',
                status1: 'Խնդրում ենք հաստատել ձեր էլ․Հասցեն',
            });
        } else {
            res.json({
                errors: 'Նման օգտատեր չկա',
            });
        }
    } catch (e) {
        next(e);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const {activationCode, password} = req.body;

        const user = await User.findOne({
            where: {
                activation_code: activationCode,
            },
        });

        if (user) {
            if (user.getDataValue('status') === 'activated') {
                const err = {errors: 'Ձեր գաղտնաբառը արդեն փոխվել է'}
                return res.status(403).json({
                    err
                })
            }
            await User.update({
                password,
                status: 'activated',
            }, {
                where: {
                    id: user.id,
                },
            });
            res.json({
                status: 'Ok',
                msg: 'Ձեր գաղտնաբառը փոխվել է',
            });
            return;
        }
        res.json({
            errors: 'Նման օգտատեր չկա: Նորից փորձեք:',
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    searchUser,
    getUserById,
    getUser,
    updateUser,
    addFriend,
    cancelFriend,
    getOwnFollowingRequests,
    getFollowers,
    acceptFollowingRequest,
    suggestionsUser,
    getFriends,
    denyFriendRequest,
    resetPassword,
    changePassword,
    getSendedFriends
};
