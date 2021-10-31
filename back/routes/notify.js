const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const handlers = require('../handlers/notify');


router.post('/notify', authorization, handlers.createNotify);

router.delete('/notify/:id', authorization, handlers.removeNotify);

router.get('/notifies', authorization, handlers.getNotifies);

router.patch('/isReadNotify/:id', authorization, handlers.isReadNotify);

router.delete('/deleteAllNotify', authorization, handlers.deleteAllNotifies);


module.exports = router;
