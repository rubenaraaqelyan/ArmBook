const {Op} = require("sequelize");
const {Conversation} = require('../models/');
const {Message} = require('../models/');


const createMessage = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const getConversations = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const getMessages = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const deleteMessages = async (req, res) => {
    try {



    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const deleteConversation = async (req, res) => {
    try {


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = {createMessage, getConversations, getMessages, deleteMessages, deleteConversation};
