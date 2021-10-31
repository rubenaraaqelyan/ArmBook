const { Op } = require("sequelize");
const { User } = require("../models");
const { Post } = require('../models');
const { Comment, Like } = require("../models");
const {sequelize} = require("../models");


const createOrUpdatePostImage = async (req, res) => {
    try {
        const {imageUrl, user, content} = req.body;

        const post = await Post.create({
            userId: user.id,
            image: imageUrl ? global.serverUrl + "/" + imageUrl : null,
            content
        });

        res.json(post);


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const createOrUpdatePostContent = async (req, res) => {
    try {
        const {user, content} = req.body;
        const {postId} = req.params;

        const result = await Post.update({content}, {where: {userId: user.id, id: postId}})

        if (!result) {
            throw {
                message: "Post doesn't exist !"
            }
        }

        res.json({message: result})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getPosts = async (req, res) => {
    try {
        const {page = 1} = req.query;
        const offset = (page - 1) * 5;

        const posts = await Post.findAndCountAll({
            where: {userId: req.body.user.id},
            include: [
                {
                    model: Like,
                    as: 'likePost'
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName']
                },
                {
                    model: Comment,
                    as: 'commentPost',
                    include: [
                        { model: User, attributes: ["id", "email"] }
                    ]
                }
            ],
            distinct: true,
            limit: 5,
            offset: +offset,
            order: [['createdAt', 'DESC']]
        })

        res.json(posts)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const updatePost = async (req, res) => {
    try {
        const {content, imageUrl} = req.body;
        const postId = await Post.findByPk(req.params.id)

        const post = await Post.update({
            content, image: imageUrl ? global.serverUrl + "/" + imageUrl : postId.image
        }, {where: {id: req.params.id}});

        res.json({
            msg: "Updated Post!",
            newPost: {
                post,
                content,
            }
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(400).json({msg: 'This post does not exist.'})

        res.json({
            post
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.destroy({
            where:
                {id: req.params.id, userId: req.body.user.id}
        })

        res.json({
            msg: 'Deleted Post!',
            newPost: {
                post,
                user: req.user
            }
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const likePost = async (req, res) => {
    try {
        const {id} = req.params;

        const likes = await Like.findOne({
            where: {
                userId: +req.body.user.id,
                postId: +id,
            }
        })
        if (likes) {
            return res.status(500).json({
                msg: 'You already liked this post',
            })
        }
        const like = await Like.create({
            userId: +req.body.user.id,
            postId: +id,
        })

        res.json({
            data: like,
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const unLikePost = async (req, res) => {
    try {
        const {id} = req.params;

        const like = await Like.destroy({
            where: {
                userId: +req.body.user.id,
                postId: +id,
            },
            limit: 1,
        })

        res.json({
            msg: 'UnLiked Post!',
            like,
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getUserPosts = async (req, res) => {
    try {

        const features = await Post.findOne({
            where: {userId: req.params.id},
            include: [{
                model: Like,
                as: 'likePost'
            }],
        })

        res.json({features})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getPostsDiscover = async (req, res) => {
    try {


        return res.status(500).json({msg: 'no data'})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const savePost = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const unSavePost = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getSavePosts = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = {
    createOrUpdatePostImage,
    createOrUpdatePostContent,
    getPosts,
    updatePost,
    getPost,
    deletePost,
    likePost,
    unLikePost,
    getUserPosts,
    getPostsDiscover,
    savePost,
    unSavePost,
    getSavePosts,
};
