const {Notify} = require('../models/')


const createNotify = async (req, res) => {
    try {
        const {id, recipients, url, text, content, image} = req.body;

        if (recipients.includes(req.user.id.toString())) return;

        const notify = Notify.create({
            id, recipients, url, text, content, image, user: req.user.id
        })

        return res.json({notify})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeNotify = async (req, res) => {
    try {

        const notify = await Notify.destroy({
            where: {
                id: req.params.id, url: req.query.url
            }
        })

        return res.json({notify})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getNotifies = async (req, res) => {
    try {
        const notifies = await Notify.find({recipients: req.user.id})

        return res.json({notifies})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const isReadNotify = async (req, res) => {
    try {
        const notifies = await Notify.update({where: {id: req.params.id}}, {
            isRead: true
        })

        return res.json({notifies})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const deleteAllNotifies = async (req, res) => {
    try {
        const notifies = await Notify.destroy({
            where: {recipients: req.user.id}
        })

        return res.json({notifies})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = {createNotify, removeNotify, getNotifies, isReadNotify, deleteAllNotifies};
