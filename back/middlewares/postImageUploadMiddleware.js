const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9) + ".jpg"
        cb(null, uniqueSuffix)
        req.body.imageUrl = uniqueSuffix;
            let fileFormat = file.mimetype.split('/');
            cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
        }
})

module.exports.upload = multer({ storage })
