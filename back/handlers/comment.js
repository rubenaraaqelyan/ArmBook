const {Op} = require("sequelize");
const {Comment} = require('../models/');
const {Post} = require('../models/');
const {User} = require('../models/');


const createComment = async (req, res) => {
    try {
        const {user, content, postId} = req.body;

        const comment = await Comment.findOne({
          where: {
              personId: user.id,
              postId,
          }
        });

        const createdComment = await Comment.create({
            personId:user.id,
            postId,
            content
        })

        res.json(createdComment);
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const updateComment = async (req, res) => {
    try {



    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const likeComment = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const unLikeComment = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const deleteComment = async (req, res) => {
    try {
        const {id} = req.params;

        const comment = await Comment.findOne({
            where: {
                id,
                personId: +req.body.user.id,
            },
            limit: 1,
        }).then((result) => {
            return Comment.destroy({
                where: {
                    personId: +req.body.user.id,
                    id,
                }
            }).then(() => {return result});
        });

        res.json({
            msg: 'Comment deleted!!',
            comment,
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {createComment, updateComment, likeComment, unLikeComment, deleteComment};
